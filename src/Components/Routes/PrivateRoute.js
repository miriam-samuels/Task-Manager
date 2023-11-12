import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    const mainpage = "https://cholatrek.io/login"
    return (
        <Route {...rest} render={props => currentUser ? <Component {...props} /> : <Redirect to={mainpage} />} />
    )
}

export default PrivateRoute
