import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import Wrapper from '../assets/wrappers/ErrorPage'
import img from '../assets/images/not-found.svg'

const Error = () => {
  const error = useRouteError();
  console.log(error)

  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Not found" />
          <h3>Page not found!</h3>
          <Link to='/dashboard'>Home</Link>
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h3>Something went wrong!</h3>
      <Link to='/'>Home</Link>
    </Wrapper>
  )
}

export default Error
