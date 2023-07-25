import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMessage: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    this.setState({errorMessage: false})
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onError = errorMsg => {
    this.setState({errorMessage: errorMsg})
  }

  onClickLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const user = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(user),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onError(data.error_msg)
      // this.setState({errorMessage: true})
    }
  }

  render() {
    const {errorMessage} = this.state

    // const errorText = errorMessage && `*Username and Password didn't  match`
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="username" className="username-heading">
            USERNAME
          </label>
          <input
            type="text"
            className="input"
            placeholder="USERNAME"
            onChange={this.onChangeUserName}
            id="username"
          />
          <label htmlFor="password" className="username-heading">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="USERNAME"
            className="input"
            onChange={this.onChangePassword}
            id="password"
          />
          <button
            type="submit"
            className="login-button"
            onClick={this.onClickLogin}
          >
            Login
          </button>
          <p className="error-message">{errorMessage}</p>
        </form>
      </div>
    )
  }
}

export default LoginForm
