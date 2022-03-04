import axios from 'axios'
//THUNKS
export const addItemThunk = async bookId => {
  try {
    const {data} = await axios.get(`/api/books/${bookId}`)
    if (localStorage.getItem('cart')) {
      const bookObj = JSON.parse(localStorage.getItem('cart'))
      const objToStr = JSON.stringify(bookObj)
      const item = {}
      item[data.title] = data
      localStorage.setItem('cart', objToStr)
    }
  }catch (err) {
    console.log(err)
  }
}

export const removeGuestCartItem = book => {
  try {
    const cartArr = JSON.parse(localStorage.getItem('cart'))
    delete cartArr[book]
    const objToStr = JSON.stringify(cartArr)
    localStorage.setItem('cart', objToStr)
  } catch (err) {
    console.log(err)
  }
}

export const updateGuestItemQuantity = (cart, newQuantity) => {
  try {
    const cartArr = JSON.parse(localStorage.getItem('cart'))
    cartArr[cart].quantity = newQuantity
    const objToStr = JSON.stringify(cartArr)
    localStorage.setItem('cart', objToStr)
  } catch (err) {
    console.log(err)
  }
}

