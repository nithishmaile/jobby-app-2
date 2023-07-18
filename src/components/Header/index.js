import {AiFillHome} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/loginForm')
  }

  return (
    <>
      <nav className="mobile-nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
        <div className="react-icons">
          <Link to="/">
            <AiFillHome color="#ffffff" size={34} />
          </Link>
          <BsFillBriefcaseFill
            color="#ffffff"
            size={34}
            className="react-icons"
          />
          <Link to="/loginForm">
            <FiLogOut color="#ffffff" size={34} className="react-icons" />
          </Link>
        </div>
      </nav>
      <nav className="desktop-nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
        <div className="home-job-container">
          <Link to="/">
            <h1 className="home-heading">Home</h1>
          </Link>
          <h1 className="home-heading">Jobs</h1>
        </div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
