import React, { useState, memo, useEffect } from 'react'
import { db } from '../Firebase/Firebase';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const CardModal = ({ val, Index, lists, cards, show, toggle, present, boards, setboards }) => {
    const [cardDetails, setcardDetails] = useState(false)
    const [showMove, setshowMove] = useState(false);
    const [timeline, settimeline] = useState(false);
    const [Lists, setLists] = useState(lists)
    const [tex, settex] = useState(val.name)
    const { currentUser } = useAuth()
    const { params: { id }, } = useRouteMatch('/workspace/:id');


    const styles = { display: show ? 'flex' : 'none' }
    const moveCard = () => { setshowMove(current => !current) }
    const expire = () => { settimeline(current => !current) }
    const openCard = () => { setcardDetails(current => !current) }

    const deleteCard = () => {
        setLists(Lists.map(list => { if (list.name === present) { list.cards = list.cards.filter(elem => elem.name !== tex) } return list }))
        setboards(boards.map(board => { if (board.id === id) { board.lists = Lists } return board }))
        db.collection('users').doc(currentUser.uid).update({ boards: boards })
        toggle()
    }

    const saveEdits = () => {
        setLists(Lists.map(list => { if (list.name === present) { list.cards[Index].name = tex } return list }))
        setboards(boards.map(board => { if (board.id === id) { board.lists = Lists } return board }))
        db.collection('users').doc(currentUser.uid).update({ boards: boards })
        toggle()
    }

    const strikeCheckChangeState = () => {
        setLists(Lists.map(list => { if (list.name === present) { list.cards[Index].strikedOut = !val.strikedOut } return list }));
        setboards(boards.map(elem => { if (elem.id === id) { elem.lists = Lists } return elem }));
        db.collection('users').doc(currentUser.uid).update({ boards: boards });
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
                                <li onClick={strikeCheckChangeState}>⭕ Unstrike</li> :
                                <li onClick={strikeCheckChangeState}>🚫 Strike Out</li>
                        }
                        <li>🎨 Assign Color</li>
                        <li onClick={deleteCard}>⛔ Delete</li>
                        <li onClick={expire}>⏰ Set Due Date</li>
                    </ul>
                </div>
            </div>
            <OpenCard openCard={openCard} cardDetails={cardDetails} present={present} val={val} edits={boards} setboards={setboards} id={id} Index={Index} Lists={Lists} setLists={setLists} />
            <MoveOption edits={boards} setboards={setboards} Lists={Lists} setLists={setLists} Index={Index} showMove={showMove} val={val} present={present} moveCard={moveCard} toggle={toggle} id={id} />
            <Timeline expire={expire} timeline={timeline} present={present} val={val} edits={boards} id={id} Index={Index} Lists={Lists} />
        </div>
    )
}

const OpenCard = (props) => {
    const [cardDescription, setCardDescription] = useState(props.val.description);
    const [isChangingDescription, setisChangingDescription] = useState(false)
    const { currentUser } = useAuth()

    const descriptionChange = (e) => setCardDescription(e.target.value)

    const checkChangeState = () => setisChangingDescription(current => !current)

    const saveDescription = () => {
        props.setLists(props.Lists.map(list => { if (list.name === props.present) { list.cards[props.Index].description = cardDescription } return list }));
        props.setboards(props.edits.map(element => { if (element.id === props.id) { element.lists = props.Lists } return element }))
        db.collection('users').doc(currentUser.uid).update({ boards: props.edits })
        checkChangeState()
    }
    const styles = { display: props.cardDetails ? 'block' : 'none' }
    return (
        <div className="openCard" style={styles}>
            <div>
                <button className="closeOpenedCard" onClick={props.openCard}>X</button>
                <div className="heading">
                    <i className='cil-folder-open'></i>
                    <span><h4>{props.val.name}</h4><em> in list {props.present}</em></span>
                </div>
                <div className="description">
                    <div className="heading">
                        <i className='cil-playlist-add'></i>
                        <h6>Description</h6>
                    </div>
                    {
                        isChangingDescription ?
                            <>
                                <textarea rows="4" value={cardDescription} onChange={descriptionChange} placeholder="add a more detailed description...." />
                                <button onClick={saveDescription} className="save">Save</button>
                                <button onClick={checkChangeState}>X</button>
                            </> :
                            <p onClick={checkChangeState}>{cardDescription === '' ? 'add a more detailed description' : cardDescription}</p>
                    }
                </div>
            </div>
        </div>
    )

}
const MoveOption = (props) => {
    const [moveto, setmoveto] = useState(props.present)
    const [pos, setpos] = useState(1)
    const { currentUser } = useAuth()

    const moveStyles = { display: props.showMove ? 'block' : 'none' }
    const moveDestination = (e) => { setmoveto(e.target.value) }
    const movePosition = (e) => { setpos(e.target.value) }

    const moveTodo = () => {
        props.setLists(props.Lists.map(list => {
            if (list.name === props.present) { list.cards.splice(props.Index, 1) }
            if (list.name === moveto) { list.cards.splice(pos - 1, 0, props.val) }; return list
        }))
        props.setboards(props.edits.map(element => { if (element.id === props.id) { element.lists = props.Lists } return element }))
        db.collection('users').doc(currentUser.uid).update({ boards: props.edits })
        props.moveCard()
        props.toggle()
    }
    return (
        <Card styles={moveStyles} title="Move Card" accept={moveTodo} acceptName="Move" reject={props.moveCard}>
            <select value={moveto} onChange={moveDestination}>
                <option>Select</option>
                {props.Lists.map((list, index) => (<option key={index}>{list.name}</option>))}
            </select>
            <input type="number" placeholder="position eg: 1" value={pos} onChange={movePosition} />
        </Card>
    )
}

const Timeline = ({ expire, timeline, edits, id, val, present, Index, Lists }) => {
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
        let editedLists = Lists
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
            <div>
                <h2>Time Card</h2>
                <input type="date" value={date} onChange={dateChange} />
                <input type="time" value={time} onChange={timeChange} />
                <button onClick={setdueDate}>Save</button>
                <button onClick={() => expire()}>Cancel</button>
            </div>
        </div>
    )

}
const Card = (props) => {
    return (
        <div style={props.styles} className="moveOption">
            <div>
                <h2>{props.title}</h2>
                {props.children}
                <button onClick={props.accept}>{props.acceptName}</button> <button onClick={props.reject}>Cancel</button>
            </div>
        </div>
    )

}
export default memo(CardModal)

