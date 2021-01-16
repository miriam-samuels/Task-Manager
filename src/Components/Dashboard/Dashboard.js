import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase'
import firebase from 'firebase/app';
import Modal from './Modal';
import BoardList from './Boardlist';


function Boards() {
    const [showModal, setshowModal] = useState(false);
    const [title, settitle] = useState('');
    const [visibility, setvisibility] = useState('private');
    const [boards, setboards] = useState([]);
    const [background, setbackground] = useState("")

    useEffect(() => {
        let unmounted = false
        db.collection('boards').get().then((snapshot) => {
            if (!unmounted) {
                setboards(
                    snapshot.docs.map(doc => {
                        return {
                            id: doc.id,
                            title: doc.data().title,
                            timestamp: doc.data().timestamp,
                            visibility: doc.data().visibility,
                            background:doc.data().background,
                            todo: doc.data().Todo,
                            doing: doc.data().Doing,
                            done: doc.data().Done,
                        }
                    })) 
            }
        })
        return () => { unmounted = true };
    },[boards])



    const toggle = () => setshowModal(current => !current);

    const show = { display: showModal ? "block" : "none" };

    const handleChange = (e) => settitle(e.target.value);

    const handleVisibility = (e) => setvisibility(e.target.value);

    const handleBg = (e) => setbackground(e)

    const handleSubmit = () => {
        if (title.length === 0) {
            return;
        };
        db.collection('boards').add({
            title: title,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() ,
            visibility: visibility,
            background: background,
            todo: [],
            doing: [],
            done: [],
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch(error => {
            console.error("Error writing document: ", error);
        });
        settitle('');
        setshowModal(current => !current);
    }
    return (
        <div>
            <ul id="boards">
                <li className="create boardlist" onClick={toggle}>
                    <b>Create new board</b>
                </li>
                <BoardList boards={boards} />
            </ul>
            <Modal styles={show} toggle={toggle} title={title} handleChange={handleChange} handleSubmit={handleSubmit} visibility={visibility} handleVisibility={handleVisibility} handleBg ={handleBg} />
            <div style={{ display: 'none' }}>
            </div>
        </div>
    );
};
export default Boards;
