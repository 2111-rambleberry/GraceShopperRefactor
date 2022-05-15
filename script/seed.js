"use strict";
const fs = require("fs");
const pg = require("pg");
const { Pool } = pg;
const fastcsv = require("fast-csv");
const {
  db,
  models: { Book, User, Cart },
} = require("../server/db");

const pkg = require("../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  //creating Books
  let stream = fs.createReadStream("./script/book_data_selection.csv");
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();

      // create a new connection to the database
      let pool;

      //if connecting to heroku:
      if (process.env.NODE_ENV === "production") {
        pool = new Pool({
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false,
          },
        });
      } else {
        pool = new Pool({
          host: "localhost",
          user: process.env.USER,
          database: "book_shopper",
          password: process.env.PASSWORD,
          port: 5432,
        });
      }

      //sql query inserts data
      const query =
        "INSERT INTO books (title, series, author, description, language, isbn, genres, bookformat, pages, publisher, coverimg, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)";

      pool.connect((err, client, done) => {
        if (err) throw err;

        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        } finally {
          done();
        }
      });
    });

  stream.pipe(csvStream);

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "timmy", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
    User.create({
      username: "cody",
      password: "123",
      userType: "Admin",
      isAdmin: true,
      firstName: "cody",
      lastName: "the-turtle",
      email: "cody@emailplace.org",
    }),
  ]);

  //creating Carts
  //test carts
  const cart1 = await Cart.create();
  const cart2 = await Cart.create();
  const cart3 = await Cart.create();

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
