import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Auth/Login'
import Dashboard from './Components/Dashboard/Index'
import Workspace from './Components/Workspace/Workspace'
import * as ROUTES from './Components/Routes/Routes'
import './css/App.css';
import PrivateRoute from './Components/Routes/PrivateRoute';
import Reset from './Components/PasswordReset/Reset';
import EmailUpdate from './Components/DetailsUpdate/EmailUpdate';
import PasswordUpdate from './Components/DetailsUpdate/PasswordUpdate';
import { useAuth } from './Components/Context/AuthContext';
import Homepage from './Components/Homepage/Homepage';
import { db } from './Components/Firebase/Firebase';

const App = () => {
    const [themeCheck, setthemeCheck] = useState(false);
    const [themeSet, setthemeSet] = useState(false)
    const { theme } = useAuth()
    const changeTheme = () => {
        setthemeSet(themeSet => !themeSet)
        db.collection('status').doc('xzCColgS8ftOetfeCKhH').update({
            theme: themeSet
        })
    }
    useEffect(() => {
        const status = db.collection('status').doc('xzCColgS8ftOetfeCKhH').get().then(doc => {
            setthemeCheck(doc.data().theme)
        },[themeSet])
        return status
    })
    return (
        <div className="app" style={themeCheck ? theme.light : theme.dark}>
            <BrowserRouter>
                <Switch>
                    <Route path={ROUTES.LANDING} exact component={Login} />
                    <Route path={ROUTES.RESET} exact component={Reset} />
                    <Route path={ROUTES.HOMEPAGE} exact component = {Homepage} />
                    <PrivateRoute path={ROUTES.DASHBOARD} exact component={Dashboard} changeTheme={changeTheme}  />
                    <PrivateRoute path={ROUTES.WORKSPACE} exact component={Workspace} />
                    <PrivateRoute path={ROUTES.EMAILUPDATE} exact component={EmailUpdate} />
                    <PrivateRoute path={ROUTES.PASSWORDUPDATE} exact component={PasswordUpdate} />
                    <Route path={ROUTES.LANDING} render={() => <div>404 ERROR</div>} />
                </Switch>
            </BrowserRouter>
        </div>
    )



}

export default App;
