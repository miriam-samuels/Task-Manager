import React from 'react'
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
import Homepage from './Components/Homepage/Homepage';

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route path={ROUTES.LANDING} exact component={Login} />
                    <Route path={ROUTES.RESET} exact component={Reset} />
                    <Route path={ROUTES.HOMEPAGE} exact component = {Homepage} />
                    <PrivateRoute path={ROUTES.DASHBOARD} exact component={Dashboard} />
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
