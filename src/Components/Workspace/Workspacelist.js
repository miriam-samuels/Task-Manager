import React, { useState, useEffect, memo } from 'react'
import { db } from '../Firebase/Firebase';
import Todo from './List';
import { useAuth } from '../Context/AuthContext';
import ListModal from './ListModal';

function Workspacelist({ id, title, lists, boards }) {
    const [show, setshow] = useState(false);
    const [listDetails, setlistDetails] = useState({})
    const [addList, setaddList] = useState(false)
    const [newListTitle, setnewListTitle] = useState("")
    const [todoLists, settodoLists] = useState([])
    const [ToDo, setToDo] = useState('');
    const { currentUser } = useAuth();

    let disableAddTodo;
    useEffect(() => {
        settodoLists(lists)
    },[lists])
    const addTodo = (name) => {
        const boardsClone = boards
        const newCard = {
            board: title,
            color: "",
            description: "",
            dueDate: new Date(),
            name: ToDo,
            strikedOut: false,
        }
        settodoLists(
            todoLists.forEach(todoList => {
                if (todoList.name === name) {
                    todoList.list.splice(0, 0, newCard);
                }
            })
        )
        boardsClone.forEach(board => {
            if (board.id === id) {
                board.lists = todoLists
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: boardsClone
        })
        setToDo('')
    };
    const openDialogue = (name) => {
        const boardsClone = boards
        todoLists.forEach(todoList => {
            if (todoList.name === name) {
                todoList.isWriting = !todoList.isWriting;
                disableAddTodo = ToDo === "" || ToDo === todoList.name

            }
            else {
                todoList.isWriting = false
            }
        })
        boardsClone.forEach(board => {
            if (board.id === id) {
                board.lists = lists
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: boardsClone
        })
    };
    const addNewList = () => {
        const boardsClone = boards
        const newList = {
            name: newListTitle,
            list: [],
            isWriting: false,
        };
        boardsClone.forEach(board => {
            if (board.id === id) {
                const newItem = board.lists.concat(newList)
                board.lists = newItem
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: boardsClone
        })
        setnewListTitle("")
        setaddList(current => !current)
    }
    const toggle = (todoList) => {
        setshow(show => !show)
        setlistDetails(todoList)
    }
    if (todoLists) {
        return (
            <div className="workspacelist" >
                <div className="wk">
                    <div className="todoCon">
                        {
                            todoLists.map((todoList, index) => (
                                <div className="todo" key={index}>
                                    <div>
                                        <b>{todoList.name}</b>
                                        <button className="more" onClick={() => toggle(todoList)}>•••</button>
                                        <Todo lists={todoLists} list={todoList.list} boards={boards} listDetails={todoList.name} />
                                        <span onClick={() => openDialogue(todoList.name)} style={{ display: todoList.isWriting ? 'none' : 'block' }}>➕ Add a card</span>
                                    </div>
                                    <div className="add" style={{ display: todoList.isWriting ? 'block' : 'none' }}>
                                        <textarea placeholder="Enter a title for this card..." value={ToDo} onChange={(e) => setToDo(e.currentTarget.value)} />
                                        <button className="addcard" onClick={() => addTodo(todoList.name)} disabled={disableAddTodo}>Add Card</button>
                                        <button onClick={() => openDialogue(todoList.name)}>X</button>
                                        <button className="more">•••</button>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            show ?
                            <ListModal show={show} toggle={toggle} listDetails={listDetails} boards={boards} id={id} />:
                            <></>
                        }
                        {
                            addList ?
                                <div className="todo addList">
                                    <input type="text" placeholder="Enter list title" value={newListTitle} onChange={(e) => setnewListTitle(e.target.value)} />
                                    <button onClick={addNewList}>Add List</button>
                                    <button onClick={() => setaddList(current => !current)}>X</button>
                                </div> :
                                <div className="todo" onClick={() => setaddList(current => !current)}>
                                    ➕ Add another list
                                </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <h1 style={{ color: "white" }}>
                Loading...
            </h1>
        )
    }
}

export default memo(Workspacelist)

