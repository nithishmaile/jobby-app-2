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
    history.replace('/login')
  }

  return (
    <>
      <nav className="mobile-nav-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-logo"
          />
        </Link>
        <ul className="react-icons-container">
          <li className="react-icons-list">
            <Link to="/">
              <AiFillHome color="#ffffff" size={34} />
            </Link>
          </li>
          <li className="react-icons-list">
            <Link to="/jobs">
              <BsFillBriefcaseFill
                color="#ffffff"
                size={34}
                className="react-icons"
              />
            </Link>
          </li>
          <li className="react-icons-list">
            <Link to="/login">
              <FiLogOut
                color="#ffffff"
                size={34}
                className="react-icons"
                onClick={onClickLogout}
              />
            </Link>
          </li>
        </ul>
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
          <Link to="/jobs">
            <h1 className="home-heading">Jobs</h1>
          </Link>
        </div>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </nav>
    </>
  )
}

export default withRouter(Header)
