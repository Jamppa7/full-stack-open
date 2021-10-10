import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from '../components/Styled'

const LoginForm = ({ credentials }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = (event) => {
    event.preventDefault()

    credentials({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <Input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          Password
          <Input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <Button id='login-button' type='submit' primary=''>login</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  credentials: PropTypes.func.isRequired
}

export default LoginForm
