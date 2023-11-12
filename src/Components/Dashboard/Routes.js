import {
    MainDashboard,
    ProjectsDashboard,
    PersonalDashboard,
    TeamsDashboard,
    BusinessDashboard
} from './Dashboard'
import * as ROUTE from '../Routes/Routes'
export const routes = [
    { path: ROUTE.DASHBOARD, exact: true, name: 'Main Dashboard' },
    { path: ROUTE.MAINDASHBOARD, name: 'Main Dashboard', component: MainDashboard },
    { path: ROUTE.PROJECTSDASHBOARD, name: 'Projects Dashboard', component: ProjectsDashboard },
    { path: ROUTE.TEAMSDASHBOARD, name: 'Teams Dashboard', component: TeamsDashboard },
    { path: ROUTE.PERSONALDASHBOARD, name: 'Personal Dashboard', component: PersonalDashboard },
    { path: ROUTE.BUSINESSDASHBOARD, name: 'Business Dashboard', component: BusinessDashboard }
]