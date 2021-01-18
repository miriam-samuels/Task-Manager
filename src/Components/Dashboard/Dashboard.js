import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase'
import firebase from 'firebase/app';
import Modal from './Modal';
import BoardList from './Boardlist';
import { useAuth } from '../Context/AuthContext';

function Boards() {
    const [showModal, setshowModal] = useState(false);
    const [title, settitle] = useState('');
    const [visibility, setvisibility] = useState('private');
    const [boards, setboards] = useState([]);
    const [background, setbackground] = useState("")
    const { currentUser, generateId } = useAuth()
    const timestamp = new Date();
    useEffect(() => {
        let unmounted = false
        db.collection('users').doc(currentUser.uid).get().then(doc => {
            if (doc.exists && !unmounted) {
                setboards(doc.data().boards)
            }
        })
        return () => { unmounted = true };
    },[boards,currentUser.uid,showModal])


    const toggle = () => setshowModal(current => !current);

    const show = { display: showModal ? "block" : "none" };

    const handleChange = (e) => settitle(e.target.value);

    const handleVisibility = (e) => setvisibility(e.target.value);

    const handleBg = (e) => setbackground(e)

    const handleSubmit = () => {
        if (title.length === 0) {
            return;
        };
        db.collection('users').doc(currentUser.uid).update({
                boards:firebase.firestore.FieldValue.arrayUnion({
                    id: generateId(),
                    title: title,
                    timestamp: timestamp.toLocaleDateString(),
                    visibility: visibility,
                    background: background,
                    todo: [],
                    doing: [],
                    done: [],
                })
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
            <Modal styles={show} toggle={toggle} title={title} handleChange={handleChange} handleSubmit={handleSubmit} visibility={visibility} handleVisibility={handleVisibility} handleBg ={handleBg} boards={boards} />
            <div style={{ display: 'none' }}>
            </div>
        </div>
    );
};
export default Boards;
