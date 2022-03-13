import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Auth/Login'
import * as ROUTES from './Components/Routes/Routes'
// import './css/App.css';
import './styles/css/Index.css';
import PrivateRoute from './Components/Routes/PrivateRoute';
import Reset from './Components/PasswordReset/Reset';
import EmailUpdate from './Components/DetailsUpdate/EmailUpdate';
import PasswordUpdate from './Components/DetailsUpdate/PasswordUpdate';
import Homepage from './Components/Homepage/Homepage';
import TheLayout from './Components/Dashboard/TheLayout';
import WorkspaceLayout from './Components/Workspace/WorkspaceLayout';
import { useAuth } from './Components/Context/AuthContext';

const App = () => {
    const { currentUser } = useAuth()

    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route path={ROUTES.LANDING} exact component={Login} />
                    <Route path={ROUTES.RESET} exact component={Reset} />
                    <Route path={ROUTES.HOMEPAGE} exact component={Homepage} />
                    <PrivateRoute path={ROUTES.WORKSPACE} exact component={WorkspaceLayout} />
                    <PrivateRoute path={ROUTES.EMAILUPDATE} exact component={EmailUpdate} />
                    <PrivateRoute path={ROUTES.PASSWORDUPDATE} exact component={PasswordUpdate} />
                    <Route path={ROUTES.LANDING} render={() => <div>404 ERROR</div>} />
                    <Route path={ROUTES.DASHBOARD} render={() => currentUser ? <TheLayout /> : <Login />} />

                </Switch>
            </BrowserRouter>
        </div>
    )



}
export default App;
