import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import Menubar from '../Dashboard/Menubar'
import { db } from '../Firebase/Firebase';
import Workspacebar from './Workspacebar'
import Workspacelist from './Workspacelist'
import Background1 from '../Images/bg3.jpg';
import { useAuth } from '../Context/AuthContext';

function Workspace() {
    
    const [Todos, setTodos] = useState([]);//Todolist
    const [Doing, setDoing] = useState([]);//Doinglist
    const [Done, setDone] = useState([]);//Donelist
    const [boards, setboards] = useState()
    const [bg, setbg] = useState("")
    const [title, settitle] = useState('');
    const [visibility, setvisibility] = useState('private');
    const [timestamp, settimestamp] = useState("")
    const { currentUser } = useAuth();
    const {
        params: { id },
    } = useRouteMatch('/workspace/:id');

    useEffect(() => {
        let unmounted = false
        db.collection("users").doc(currentUser.uid).get().then(doc => {
            if (doc.exists && !unmounted) {
                setboards(doc.data().boards)
                const arr = boards
                arr.forEach(element => {
                    if (element.id === id) {
                        setTodos(element.todo)
                        setDoing(element.doing)
                        setDone(element.done)
                        setbg(element.background)
                        settitle(element.title)
                        setvisibility(element.visibility)
                        settimestamp(element.timestamp)
                    }
                });
            } else {
                console.log("No such document!");
            }
        })
        .catch(function (error) {
            console.log("Error getting document:", error);
        });
        return () => { unmounted = true };
    }, [currentUser.uid, id, boards])
    const styles = {
        minHeight: '100vh',
        backgroundImage: `url(${bg}) , url(${Background1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: '100%',
    }
    return (
        <div style={styles} id="workspace">
            <Menubar />
            <Workspacebar title={title} visibility={visibility} timestamp={timestamp} />
            <Workspacelist id={id} title={title} Todos={Todos} Doing={Doing} Done={Done} boards={boards} />
        </div>
    )
}

export default Workspace
