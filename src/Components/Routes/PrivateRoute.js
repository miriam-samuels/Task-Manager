import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

function PrivateRoute({component : Component, changeTheme, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <Route {...rest} 
        render={ props => currentUser ? <Component {...props} changeTheme={changeTheme}  /> : <Redirect to="/" />} >

        </Route>
    )
}

export default PrivateRoute
