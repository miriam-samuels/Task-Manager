import React, { useState } from 'react'
import { db } from '../Firebase/Firebase';
import { Todo, Doin, Don } from './List';
// import firebase from 'firebase/app';
import { useAuth } from '../Context/AuthContext';

function Workspacelist({ id, title, Todos, Doing, Done, boards }) {
    const [show, setshow] = useState(false);
    const [showDoing, setshowDoing] = useState(false);
    const [showDone, setshowDone] = useState(false);

    const [ToDo, setToDo] = useState('');
    const [doing, setdoing] = useState('');
    const [done, setdone] = useState('');

    const { currentUser } = useAuth();

    let disableAddTodo;
    let disableAddDoing;
    let disableAddDone;
    Todos.forEach(elem => {
        disableAddTodo = ToDo === "" || elem.name === ToDo
    })
    Doing.forEach(elem => {
        disableAddDoing = doing === "" || elem.name === doing
    })
    Done.forEach(elem => {
        disableAddDone = done === "" ||elem.name === done
    })

    const one = () => {
        const newCard = {
            board: title,
            name: ToDo,
            description: "",
            dueDate: "",
            // comments: [],
        }
        const boardsClone = boards
        boardsClone.forEach(element => {
            if (element.id === id) {
                element.todo.splice(0, 0, newCard);
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: boardsClone
        })
        setToDo('')
    };
    const two = () => {
        const newCard = {
            board: title,
            name: doing,
            description: "",
            dueDate: "",
            // comments: [],
        }
        const boardsClone = boards
        boardsClone.forEach(element => {
            if (element.id === id) {
                element.doing.splice(0, 0, newCard)
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: boardsClone
        })
        setdoing('')
    };
    const three = () => {
        const newCard = {
            board: title,
            name: done,
            description: "",
            dueDate: "",
            // comments: [],
        }
        const boardsClone = boards
        boardsClone.forEach(element => {
            if (element.id === id) {
                element.done.splice(0, 0, newCard)
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: boardsClone
        })
        setdone('')
    };

    return (
        <div className="workspacelist" >
            <div className="todoCon">
                <div className="todo">
                    <div>
                        <b>To Do</b>
                        <b>•••</b>
                        <Todo Todos={Todos} boards={boards} />
                        <span onClick={() => { setshow(current => !current) }} style={{ display: show ? 'none' : 'block' }}>+ Add a card</span>
                    </div>
                    <div className="add" style={{ display: show ? 'block' : 'none' }}>
                        <textarea placeholder="Enter a title for this card..." value={ToDo} onChange={(e) => { setToDo(e.target.value) }} />
                        <button className="addcard" onClick={one} disabled={disableAddTodo}>Add Card</button>
                        <button onClick={() => { setshow(current => !current) }}>X</button>
                        <button className="more">...</button>
                    </div>
                </div>

                <div className="todo">
                    <div>
                        <b>Doing</b>
                        <b>•••</b>
                        <Doin Doing={Doing} boards={boards}/>
                        <span onClick={() => { setshowDoing(current => !current) }} style={{ display: showDoing ? 'none' : 'block' }}>+ Add a card</span>
                    </div>
                    <div className="add" style={{ display: showDoing ? 'block' : 'none' }}>
                        <textarea placeholder="Enter a title for this card..." value={doing} onChange={(e) => { setdoing(e.target.value) }} />
                        <button className="addcard" onClick={two} disabled={disableAddDoing}>Add Card</button>
                        <button onClick={() => { setshowDoing(current => !current) }}>X</button>
                        <button className="more">...</button>
                    </div>
                </div>

                <div className="todo">
                    <div>
                        <b>Done</b>
                        <b>•••</b>
                        <Don Done={Done} boards={boards} />
                        <span onClick={() => { setshowDone(current => !current) }} style={{ display: showDone ? 'none' : 'block' }}>+ Add a card</span>
                    </div>
                    <div className="add" style={{ display: showDone ? 'block' : 'none' }}>
                        <textarea placeholder="Enter a title for this card..." value={done} onChange={(e) => { setdone(e.target.value) }} />
                        <button className="addcard" onClick={three} disabled={disableAddDone}>Add Card</button>
                        <button onClick={() => { setshowDone(current => !current) }}>X</button>
                        <button className="more">...</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspacelist

