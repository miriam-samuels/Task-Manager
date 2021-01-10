import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Menubar from '../Dashboard/Menubar'
import { db } from '../Firebase/Firebase';
import Workspacebar from './Workspacebar'
import Workspacelist from './Workspacelist'
import Background3 from '../Images/house4.jpg';

function Workspace() {
    const [bg, setbg] = useState("")
    const [title, settitle] = useState('');
    const [visibility, setvisibility] = useState('private');
    const [timestamp, settimestamp] = useState("")

    const {
        params: { id },
    } = useRouteMatch('/workspace/:id');

    useEffect(() => {
        db.collection("boards").doc(id).get().then(doc => {
            if (doc.exists) {
                setbg(doc.data().background)
                settitle(doc.data().title)
                setvisibility(doc.data().visibility)
                settimestamp(doc.data().timestamp.toDate().toDateString())
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }, [id])
    const styles = {
        height: '100vh',
        backgroundImage: `url(${bg}) , url(${Background3})`, 
        backgroundSize: "cover",
    }
    return (
        <div style={styles}>
            <Menubar />
            <Workspacebar title={title} visibility={visibility} timestamp={timestamp} />
            <Workspacelist id={id} />
        </div>
    )
}

export default Workspace
