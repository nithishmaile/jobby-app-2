import Cookies from 'js-cookie'

import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('token')
  if (jwtToken === undefined) {
    return <Redirect to="/Login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
