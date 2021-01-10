import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Components/Routes/Navigation';
import Login from './Components/Auth/Login'
import Dashboard from './Components/Dashboard/Index'
import Workspace from './Components/Workspace/Workspace'
import * as ROUTES from './Components/Routes/Routes'
import './App.css';
import PrivateRoute from './Components/Routes/PrivateRoute';
import Reset from './Components/PasswordReset/Reset';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={ROUTES.LANDING} exact component={Login} />
                <Route path={ROUTES.RESET} exact component={Reset} />
                <PrivateRoute path={ROUTES.DASHBOARD} exact component={Dashboard} />
                <PrivateRoute path={ROUTES.WORKSPACE} exact component={Workspace} />
                <Route path={ROUTES.LANDING} render={() => <div>404 ERROR</div>} />
            </Switch>
        </BrowserRouter>
    )



}

export default App;
