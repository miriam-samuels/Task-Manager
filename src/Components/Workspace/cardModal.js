import React, { useState, memo } from 'react'
import { db } from '../Firebase/Firebase';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const CardModal = ({ val, Index, lists, list, show, toggle, present, boards }) => {
    const [cardDetails, setcardDetails] = useState(false)
    const [showMove, setshowMove] = useState(false);
    const [timeline, settimeline] = useState(false);
    const [edits, setedits] = useState(boards)
    const [todoLists, settodoLists] = useState(lists)
    const [tex, settex] = useState(val.name)
    const { currentUser } = useAuth()

    const {
        params: { id },
    } = useRouteMatch('/workspace/:id');


    const styles = {
        display: show ? 'flex' : 'none'
    }
    const moveCard = () => {
        setshowMove(current => !current)
    }
    const expire = () => {
        settimeline(current => !current)
    }
    const openCard = () => {
        setcardDetails(current => !current)
    }
    const deleteCard = () => {
        const listEdited = list.filter(elem => elem.name !== tex)
        settodoLists(
            todoLists.forEach(todoList => {
                if (todoList.name === present) {
                    todoList.list = listEdited
                }
            })
        )
        setedits(
            edits.forEach(elem => {
                if (elem.id === id) {
                    elem.lists = todoLists
                }
            })
        )
        db.collection('users').doc(currentUser.uid).update({
            boards: edits
        })
        toggle()
    }
    const saveEdits = () => {
        settodoLists(
            todoLists.forEach(todoList => {
                if (todoList.name === present) {
                    todoList.list[Index].name = tex
                }
            })
        )
        setedits(
            edits.forEach(elem => {
                if (elem.id === id) {
                    elem.lists = todoLists
                }
            })
        )
        db.collection('users').doc(currentUser.uid).update({
            boards: edits
        })
        toggle()
    }
    const strikeCheck = () => {
        settodoLists(
            todoLists.forEach(todoList => {
                if (todoList.name === present) {
                    todoList.list[0].strikedOut = !val.strikedOut
                }
            })
        );
        setedits(
            edits.forEach(elem => {
                if (elem.id === id) {
                    elem.lists = todoLists
                }
            })
        );
        db.collection('users').doc(currentUser.uid).update({
            boards: edits
        });
        toggle()
    }
    return (
        <div className="listModal">
            <div className="options" style={styles}>
                <div className="listContent">
                    <textarea rows="6" value={tex} onChange={(e) => settex(e.currentTarget.value)} />
                    <button onClick={saveEdits}>Save</button>
                    <button onClick={toggle}>Cancel</button>
                </div>
                <div className="listOption">
                    <ul>
                        <li onClick={openCard}>📖 Open Card</li>
                        <li onClick={moveCard}>🔛 Move</li>
                        {
                            val.strikedOut ?
                                <li onClick={strikeCheck}>⭕ Unstrike</li> :
                                <li onClick={strikeCheck}>🚫 Strike Out</li>
                        }
                        <li onClick={deleteCard}>⛔ Delete</li>
                        <li onClick={expire}>⏰ Set Due Date</li>
                    </ul>
                </div>
            </div>
            <>
                <OpenCard openCard={openCard} cardDetails={cardDetails} present={present} val={val} edits={edits} id={id} Index={Index} todoLists={todoLists} />
            </>
            <>
                <MoveOption edits={edits} todoLists={todoLists} Index={Index} showMove={showMove} val={val} present={present} moveCard={moveCard} toggle={toggle} id={id} />
            </>
            <>
                <Timeline expire={expire} timeline={timeline} present={present} val={val} edits={edits} id={id} Index={Index} todoLists={todoLists} />
            </>
        </div>
    )
}

const OpenCard = ({ openCard, cardDetails, present, val, edits, id, Index, todoLists }) => {
    const [cardDescription, setCardDescription] = useState(val.description);
    const [changeDescription, setchangeDescription] = useState(false)
    const { currentUser } = useAuth()

    const descriptionChange = (e) => {
        setCardDescription(e.target.value)
    }
    const check = () => {
        setchangeDescription(current => !current)
    }
    const saveDescription = () => {
        let newEdits = edits
        let editedLists = todoLists
        editedLists.forEach(todoList => {
            if (todoList.name === present) {
                todoList.list[Index].description = cardDescription
            }
        })
        for (const element of newEdits) {
            if (element.id === id) {
                element.lists = editedLists
            }
        }
        db.collection('users').doc(currentUser.uid).update({
            boards: newEdits
        })
        check()
    }
    const styles = {
        display: cardDetails ? 'block' : 'none',
    }
    return (
        <div className=" openCard" style={styles}>
            <button className="deleteBoard" onClick={openCard}>X</button>
            <div className="heading">
                <h2>💠  {val.name}</h2>
                <em>••• in list {present}</em>
            </div>
            <div className="description">
                <h3>💬Description</h3>
                {
                    changeDescription ?
                        <>
                            <textarea rows="4" value={cardDescription} onChange={descriptionChange} placeholder="✍ add a more detailed description...." />
                            <button onClick={saveDescription} className="save">Save</button>
                            <button onClick={check}>X</button>
                        </> :
                        <>
                            <em>✍ click to edit</em>
                            <p onClick={check}>{cardDescription}</p>
                        </>
                }
            </div>
        </div>
    )

}
const MoveOption = ({ edits, todoLists, showMove, val, present, moveCard, toggle, id, Index }) => {
    const [moveto, setmoveto] = useState(present)
    const [pos, setpos] = useState(1)
    const { currentUser } = useAuth()

    const moveStyles = {
        display: showMove ? 'block' : 'none'
    }
    const moveDestination = (e) => {
        setmoveto(e.target.value)
    }
    const movePosition = (e) => {
        setpos(e.target.value)
    }
    const moveTodo = () => {
        let moveEdits = edits;
        let editedLists = todoLists
        editedLists.forEach(todoList => {
            if (todoList.name === present) {
                todoList.list.splice(Index, 1)
            }
            if (todoList.name === moveto) {
                todoList.list.splice(pos - 1, 0, val)
            }
        })
        moveEdits.forEach(element => {
            if (element.id === id) {
                element.lists = editedLists
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: moveEdits
        })
        moveCard()
        toggle()
    }
    return (
        <div style={moveStyles} className="moveOption">
            <h2>Move Card</h2>
            <select value={moveto} onChange={moveDestination}>
                <option>Select</option>
                {
                    todoLists.map((todoList,index) =>(
                            <option key={index}>{todoList.name}</option>
                    ))
                }

            </select>
            <input type="number" placeholder="position eg: 1" value={pos} onChange={movePosition} />
            <button onClick={moveTodo}>Move</button>
            <button onClick={toggle}>Cancel</button>
        </div>
    )
}

const Timeline = ({ expire, timeline, edits, id, val, present, Index, todoLists }) => {
    const [date, setdate] = useState("")
    const [time, settime] = useState("")
    const { currentUser } = useAuth()

    const dueDate = new Date(`${date} ${time}`);

    const timestyle = {
        display: timeline ? 'block' : 'none'
    }
    const dateChange = (e) => {
        setdate(e.target.value)
    }
    const timeChange = (e) => {
        settime(e.target.value)
    }
    const setdueDate = () => {
        console.log(dueDate)
        let newEdits = edits
        let editedLists = todoLists
        editedLists.forEach(todoList => {
            if (todoList.name === present) {
                todoList.list[Index].dueDate = dueDate
            }
        })
        for (const element of newEdits) {
            if (element.id === id) {
                element.lists = editedLists
            }
        }
        db.collection('users').doc(currentUser.uid).update({
            boards: newEdits
        })
    }
    return (
        <div style={timestyle} className="moveOption">
            <h2>Time Card</h2>
            <input type="date" value={date} onChange={dateChange} />
            <input type="time" value={time} onChange={timeChange} />
            <button onClick={setdueDate}>Save</button>
            <button onClick={() => expire()}>Cancel</button>
        </div>
    )

}
export default memo(CardModal)

