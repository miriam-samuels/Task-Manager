import React, { useState, memo } from 'react'
import { db } from '../Firebase/Firebase';
import { useAuth } from '../Context/AuthContext';
import CardModal from './cardModal';

function Workspacelist({ id, title, lists, boards }) {
    const [show, setshow] = useState(false);
    const [listDetails, setlistDetails] = useState({})
    const [addList, setaddList] = useState(false)
    const [newListTitle, setnewListTitle] = useState("")
    const [ToDo, setToDo] = useState('');
    const { currentUser } = useAuth();

    const addTodo = (name) => {
        const boardsClone = boards
        const todoLists = lists
        const newCard = { board: title, color: "", description: "", dueDate: new Date(), name: ToDo, strikedOut: false, }

        todoLists.forEach(todoList => { if (todoList.name === name) todoList.list.splice(0, 0, newCard) })
        boardsClone.forEach(board => { if (board.id === id) { board.lists = todoLists } })
        db.collection('users').doc(currentUser.uid).update({ boards: boardsClone })
        setToDo('')
    };

    const openDialogue = (name) => {
        const boardsClone = boards
        const todoLists = lists
        todoLists.forEach(todoList => {
            if (todoList.name === name) todoList.isWriting = !todoList.isWriting;
            else todoList.isWriting = false
        })
        boardsClone.forEach(board => { if (board.id === id) { board.lists = todoLists } })
        db.collection('users').doc(currentUser.uid).update({ boards: boardsClone })
    };

    const addNewList = () => {
        const boardsClone = boards
        const newList = { name: newListTitle, list: [], isWriting: false, };
        boardsClone.forEach(board => {
            if (board.id === id) { const newItem = board.lists.concat(newList); board.lists = newItem }
        })
        db.collection('users').doc(currentUser.uid).update({ boards: boardsClone })
        setnewListTitle("")
        setaddList(current => !current)
    }

    const toggle = (todoList) => { setshow(show => !show); setlistDetails(todoList) }

    const disableAddTodo = ToDo === "";

    if (lists) {
        return (
            <div className="workspacelist" >
                <div className="wk">
                    <div className="todoCon">
                        {
                            lists.map((todoList, index) => (
                                <div className="todo" key={index}>
                                    <div>
                                        <b>{todoList.name}</b>
                                        <button className="more" onClick={() => toggle(todoList)}>•••</button>
                                        <Todo lists={lists} list={todoList.list} boards={boards} listName={todoList.name} />
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
                        {show ? <ListModal show={show} toggle={toggle} listDetails={listDetails} boards={boards} id={id} /> : <></>}
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

const Todo = ({ lists, list, boards, listName }) => {
    const [show, setshow] = useState(false);
    const [selected, setselected] = useState("")
    const [Index, setIndex] = useState(0)

    const toggle = () => { setshow(show => !show) }
    const select = (item, index) => { setselected(item); setIndex(index) }
    return (
        <>
            <ul>
                {
                    list.map((item, index) => (
                        <li key={index}>
                            <button className="deleteBoard" onClick={() => { toggle(); select(item, index) }}>•••</button>
                            {item.strikedOut ? <span><del>{item.name}</del></span> : <span>{item.name}</span>}
                        </li>
                    ))
                }
            </ul>
            {
                show ?
                    <CardModal
                        val={selected}
                        boards={boards}
                        Index={Index}
                        lists={lists}
                        list={list}
                        present={listName}
                        show={show}
                        toggle={toggle}
                    /> :
                    <></>
            }
        </>
    );
};

function ListModal({ show, toggle, listDetails, boards, id }) {
    const { currentUser } = useAuth()
    const styles = { display: show ? 'block' : 'none', top: "35%" }

    const deleteBoard = () => {
        let boardsClone = boards;
        boardsClone.forEach(elem => {
            if (elem.id === id) { elem.lists = elem.lists.filter(list => list.name !== listDetails.name) }
        })
        db.collection('users').doc(currentUser.uid).update({ boards: boardsClone })
            .then(() => { console.log("Document successfully deleted!"); })
            .catch(error => { console.error("Error writing document: ", error); });
        toggle()
    }
    return (
        <div className="moveOption" style={styles} >
            <h2>Delete Card</h2>
            <h3>Are you sure you want to delete list {listDetails.name}</h3>
            <button onClick={deleteBoard}>Delete</button>
            <button onClick={toggle}>Cancel</button>
        </div>
    )
}

