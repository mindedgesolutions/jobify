import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'
import { Logo, Main } from '../assets/components'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>tracking</span> app</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem voluptatum exercitationem voluptate deserunt, temporibus optio illo voluptates perferendis, ipsam error tempore suscipit maiores fugit? Dolor alias eveniet nostrum adipisci eaque.</p>
          <Link to='/register' className='btn register-link'>Register</Link>
          <Link to='/login' className='btn'>Login / Demo User</Link>
        </div>
        <Main />
      </div>
    </Wrapper>
  )
}

export default Landing
