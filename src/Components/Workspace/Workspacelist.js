import React, { useState, useEffect } from 'react'
import { db } from '../Firebase/Firebase';
import { Todo, Doin, Don } from './List';
// import firebase from 'firebase/app';
import { useAuth } from '../Context/AuthContext';

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

    const [boards, setboards] = useState()

    const { currentUser } = useAuth()

    useEffect(() => {
        let unmounted = false
        db.collection("users").doc(currentUser.uid).get().then(doc => {
            if (doc.exists && !unmounted) {
                const arr = doc.data().boards
                arr.forEach(element => {
                    if (element.id === id) {
                        setTodos(element.todo)
                        setDoing(element.doing)
                        setDone(element.done)
                    }
                });
                setboards(arr)
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
        return () => { unmounted = true };
    }, [boards, currentUser.uid, id])

    const one = () => {
        setboards(
            boards.forEach(element => {
                if (element.id === id) {
                    element.todo.splice(0, 0, ToDo)
                }
            })
        )
        db.collection('users').doc(currentUser.uid).update({
            boards: boards
        })

        setToDo('')
    };
    const two = () => {
        setboards(
            boards.forEach(element => {
                if (element.id === id) {
                    element.doing.splice(0, 0, doing)
                }
            })
        )
        db.collection('users').doc(currentUser.uid).update({
            boards: boards
        })

        setdoing('')
    };
    const three = () => {
        setboards(
            boards.forEach(element => {
                if (element.id === id) {
                    element.done.splice(0, 0, done)
                }
            })
        )

        db.collection('users').doc(currentUser.uid).update({
            boards: boards
        })

        setdone('')
    };
    const deleteTodo = (value) => {
        setboards(
            boards.forEach(element => {
                if (element.id === id) {
                    const i = element.todo.indexOf(value);
                    element.todo.splice(i, 1)
                }
            })
        )

        db.collection('users').doc(currentUser.uid).update({
            boards: boards
        })
    }
    const deleteDoing = (value) => {
        setboards(
            boards.forEach(element => {
                if (element.id === id) {
                    const i = element.todo.indexOf(value);
                    element.doing.splice(i, 1)
                }
            })
        )
        db.collection('users').doc(currentUser.uid).update({
            boards: boards
        })
    }
    const deleteDone = (value) => {
        setboards(
            boards.forEach(element => {
                if (element.id === id) {
                    const i = element.todo.indexOf(value);
                    element.done.splice(i, 1)
                }
            })
        )

        db.collection('users').doc(currentUser.uid).update({
            boards: boards
        })
    }
    return (
        <div className="workspacelist" >
            <div className="todoCon">
                <div className="todo">
                    <div>
                        <b>To Do</b>
                        <b>•••</b>
                        <Todo Todos={Todos} deleteItem={deleteTodo} />
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
                        <b>•••</b>
                        <Doin Doing={Doing} deleteItem={deleteDoing} />
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
                        <b>•••</b>
                        <Don Done={Done} deleteItem={deleteDone} />
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
        </div>
    )
}

export default Workspacelist

