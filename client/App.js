import React from 'react'
import GenreNav from './components/GenreNav'
import Routes from './Routes'
import Footer from './components/Footer'
import TopNav from './components/TopNav'

const App = () => {
  return (
    <div>
      <div className='content'>
        <TopNav />
        <GenreNav />
        <Routes />
      </div>
      <Footer />
    </div>
  )
}

export default App
