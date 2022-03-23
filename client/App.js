import React from 'react'
import GenreNav from './components/GenreNav'
import Routes from './Routes'
import Footer from './components/Footer'
import TopNav from './components/TopNav'

const App = () => {
  return (
    <div>
      <TopNav />
      <GenreNav />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
