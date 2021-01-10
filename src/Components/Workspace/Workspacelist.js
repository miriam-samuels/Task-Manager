import React, { useState, useEffect } from 'react'
import { db } from '../Firebase/Firebase';
import { Todo, Doin, Don } from './List';
import firebase from 'firebase/app';

function Workspacelist({ id }) {
    const [show, setshow] = useState(false);
    const [showDoing, setshowDoing] = useState(false);
    const [showDone, setshowDone] = useState(false);

    const [Todos, setTodos] = useState([]);//Todolist
    const [ToDo, setToDo] = useState('');
    const [Doing, setDoing] = useState([]);//Doinglist
    const [doing, setdoing] = useState('');
    const [Done, setDone] = useState([]);//Donelist
    const [done, setdone] = useState('');

    useEffect(() => {
            db.collection("boards").doc(id).get().then(doc => {
                if ( doc.exists ) {
                    setTodos(doc.data().todo);
                    setDoing(doc.data().doing);
                    setDone(doc.data().done)
                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            }); 
    },[Todos,doing,done,ToDo,id])

    const one = () => {
        db.collection('boards').doc(id).update({
            todo: firebase.firestore.FieldValue.arrayUnion(ToDo)
        })

        setToDo('')
    };
    const two = () => {
        db.collection('boards').doc(id).update({
            doing: firebase.firestore.FieldValue.arrayUnion(doing)
        })

        setdoing('')
    };
    const three = () => {
        db.collection('boards').doc(id).update({
            done: firebase.firestore.FieldValue.arrayUnion(done)
        })

        setdone('')
    };
    const deleteTodo = (value) => {
        db.collection('boards').doc(id).update({
            todo: firebase.firestore.FieldValue.arrayRemove(value)
        })
    }
    const deleteDoing = (value) => {
        db.collection('boards').doc(id).update({
            doing: firebase.firestore.FieldValue.arrayRemove(value)
        })
    }
    const deleteDone = (value) => {
        db.collection('boards').doc(id).update({
            done: firebase.firestore.FieldValue.arrayRemove(value)
        })
    }
    return (
        <div className="workspacelist" >
            <div className="todo">
                <div>
                    <b>To Do</b>
                    <b>...</b>
                    <Todo Todos={Todos} deleteItem = {deleteTodo}/>
                    <span onClick={() => { setshow(current => !current) }} style={{ display: show ? 'none' : 'block' }}>+ Add a card</span>
                </div>
                <div className="add" style={{ display: show ? 'block' : 'none' }}>
                    <textarea placeholder="Enter a title for this card..." value={ToDo} onChange={(e) => { setToDo(e.target.value) }} />
                    <button className="addcard" onClick={one}>Add Card</button>
                    <button onClick={() => { setshow(current => !current) }}>X</button>
                    <button className="more">...</button>
                </div>
            </div>

            <div className="todo">
                <div>
                    <b>Doing</b>
                    <b>...</b>
                    <Doin Doing={Doing} deleteItem = {deleteDoing} />
                    <span onClick={() => { setshowDoing(current => !current) }} style={{ display: showDoing ? 'none' : 'block' }}>+ Add a card</span>
                </div>
                <div className="add" style={{ display: showDoing ? 'block' : 'none' }}>
                    <textarea placeholder="Enter a title for this card..." value={doing} onChange={(e) => { setdoing(e.target.value) }} />
                    <button className="addcard" onClick={two}>Add Card</button>
                    <button onClick={() => { setshowDoing(current => !current) }}>X</button>
                    <button className="more">...</button>
                </div>
            </div>

            <div className="todo">
                <div>
                    <b>Done</b>
                    <b>...</b>
                    <Don Done={Done} deleteItem = {deleteDone} />
                    <span onClick={() => { setshowDone(current => !current) }} style={{ display: showDone ? 'none' : 'block' }}>+ Add a card</span>
                </div>
                <div className="add" style={{ display: showDone ? 'block' : 'none' }}>
                    <textarea placeholder="Enter a title for this card..." value={done} onChange={(e) => { setdone(e.target.value) }} />
                    <button className="addcard" onClick={three}>Add Card</button>
                    <button onClick={() => { setshowDone(current => !current) }}>X</button>
                    <button className="more">...</button>
                </div>
            </div>
        </div>
    )
}

export default Workspacelist

