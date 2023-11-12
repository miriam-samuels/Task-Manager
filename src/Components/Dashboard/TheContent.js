import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { useAuth } from '../Context/AuthContext'
import PrivateRoute from '../Routes/PrivateRoute'
import { routes } from './Routes'
function TheContent() {
    const { currentUser } = useAuth()

    return (
        <>
            {
                routes.map((route, idx) => {
                    return route.component && (
                        <PrivateRoute
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            component={route.component}
                        />
                    )
                })
            }
            <Redirect from="/" to={`/main/${currentUser.uid}`} />
        </>
    )
}

export default TheContent
