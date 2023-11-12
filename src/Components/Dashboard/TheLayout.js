import React from 'react'
import Header from '../shared/Header'
import Sidebar from './Sidebar'
import TheContent from './TheContent'
import {
    MainDashboard,
    ProjectsDashboard,
    PersonalDashboard,
    TeamsDashboard,
    BusinessDashboard
} from './Dashboard'
function TheLayout() {

    return (
        <div className="layout">
            <div className="layout--header">
                <header><Header/></header>
            </div>
            <div className="layout--wrapper">
                <div className="wrapper--sidebar">
                    <Sidebar />
                </div>

                <div className="wrapper--body">
                    <div className="wrapper--main">
                        <main>
                            {/* <MainDashboard/> */}
                            <TheContent />
                        </main>
                    </div>
                </div>
            </div>
            <div className="layout--footer">
                <footer></footer>
            </div>
        </div>
    )
}

export default TheLayout
