import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useRouteMatch } from 'react-router-dom'
import { db } from '../Firebase/Firebase';
import { Background1 } from '../shared/Images';
import { useAuth } from '../Context/AuthContext';
import Workspace from './Workspace'

function WorkspaceLayout() {
    const [boards, setboards] = useState()
    const [board, setboard] = useState()
    const { currentUser } = useAuth();
    const { params: { id }, } = useRouteMatch('/workspace/:id');

    useEffect(() => { getData() }, [])
    const getData = () => {
        db.collection("users").doc(currentUser.uid).get().then(doc => {
            if (doc.exists) { setboards(doc.data().boards); setboard(doc.data().boards.filter(board => board.id === id)[0]) }
            else console.log("No such document!");
        })
    }

    const styles = {
        minHeight: '100vh',
        backgroundImage: board ? `url(${board.background})` : `url(${Background1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: '100%',
        position: 'relative',
    }
    return (
        <div style={styles} className="layout">
            <div className="layout--header">
                <header><Header board={board} /></header>
            </div>
            <div className="workspace--wrapper">
                <div className="workspace--body">
                    <div className="wrapper--main">
                        <main> {board ? <Workspace id={id} board={board} boards={boards} /> : <h1 style={{ color: 'white' }}>Loading....</h1>} </main>
                    </div>
                </div>
                <div className="workspace--sidebar">
                    <Sidebar />
                </div>
            </div>
            <div className="layout--footer">
                <footer></footer>
            </div>
        </div>
    )
}

export default WorkspaceLayout
