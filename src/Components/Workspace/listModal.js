import React, { useState } from 'react'
import { db } from '../Firebase/Firebase';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ListModal = ({ val, Index, option1, option2, show, toggle, present,boards }) => {
    const [cardDetails, setcardDetails] = useState(false)
    const [showMove, setshowMove] = useState(false);
    const [timeline, settimeline] = useState(false);
    const [edits, setedits] = useState(boards)
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
        setedits(
            edits.forEach(elem => {
                if (elem.id === id) {
                    const newElem = elem[present].filter(elem => elem.name !== tex);
                    elem[present] = newElem
                }
            })
        )
        db.collection('users').doc(currentUser.uid).update({
            boards: edits
        })
        toggle()
    }
    const saveEdits = () => {
        setedits(
            edits.forEach(element => {
                if (element.id === id) {
                    element[present][Index].name = tex
                }
            })
        )
        db.collection('users').doc(currentUser.uid).update({
            boards: edits
        })
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
                    <li onClick={deleteCard}>🚫 Delete</li>
                    <li onClick={expire}>⏰ Set timeline</li>
                </ul>
            </div>
            </div>
            <>
                <OpenCard openCard={openCard} cardDetails={cardDetails} present={present} val={val} edits={edits} id={id} Index={Index} />
            </>
            <>
                <MoveOption edits={edits} option1={option1} option2={option2} Index={Index} showMove={showMove} val={val} present={present} moveCard={moveCard} toggle={toggle} id={id} />
            </>
            <>
                <Timeline expire={expire} timeline={timeline} />
            </>
        </div>
    )
}

const OpenCard = ({ openCard, cardDetails, present, val, edits,id,Index }) => {
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
            for(const element of newEdits){
                if (element.id === id) {
                    element[present][Index].description = cardDescription
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
    return(
        <div className=" openCard" style={styles}>
            <button className="deleteBoard" onClick={openCard}>X</button>
            <div>
                <h2>💠{val.name}</h2>
                <em>🛰 in list {present}</em>
            </div>
            <div className="description">
                <h3>💬Description</h3>
                {
                    changeDescription ? 
                    <>
                    <textarea rows="4" value={cardDescription} onChange={descriptionChange} placeholder="✍ add a more detailed description...." />
                    <button onClick={saveDescription} className="save">Save</button>
                    <button onClick={check}>X</button>
                    </>:
                    <>
                    <em>✍ click to edit</em>
                    <p onClick={check}>{cardDescription}</p>
                    </>
                }
            </div>
        </div>
    )

}
const MoveOption = ({ edits, option1, option2, showMove, val, present, moveCard, toggle, id, Index }) => {
    const [moveto, setmoveto] = useState('Select')
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
        moveEdits.forEach(element => {
            if (element.id === id) {
                element[present].splice(Index, 1)
                element[moveto].splice(pos - 1, 0, val)
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
                <option>{present} (current)</option>
                <option>{option1}</option>
                <option>{option2}</option>
            </select>
            <input type="number" placeholder="position eg: 1" value={pos} onChange={movePosition} />
            <button onClick={moveTodo}>Move</button>
            <button onClick={toggle}>Cancel</button>
        </div>
    )
}

const Timeline = ({ expire, timeline }) => {
    const timestyle = {
        display: timeline ? 'block' : 'none'
    }
    return (
        <div style={timestyle} className="moveOption">
            <h2>Time Card(coming soon)</h2>
            <input type="date" />
            <input type="time" />
            <button>Save</button>
            <button onClick={() => expire()}>Cancel</button>
        </div>
    )

}
export default ListModal

