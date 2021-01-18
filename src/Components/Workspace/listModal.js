import React, { useState, useEffect } from 'react'
import { db } from '../Firebase/Firebase';
import { useRouteMatch } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ListModal = ({ val, Index, option1, option2, deleteItem, show, toggle, present }) => {
    const [showMove, setshowMove] = useState(false);
    const [timeline, settimeline] = useState(false);
    const [edits, setedits] = useState([])
    const [tex, settex] = useState(val)
    const { currentUser } = useAuth()

    const {
        params: { id },
    } = useRouteMatch('/workspace/:id');

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            db.collection('users').doc(currentUser.uid).get().then(doc => {
                setedits(doc.data().boards)
            })
        }
        return () => { unmounted = true };
    }, [edits, currentUser.uid, showMove])

    const styles = {
        display: show ? 'flex' : 'none'
    }
    const moveCard = () => {
        setshowMove(current => !current)
    }
    const expire = () => {
        settimeline(current => !current)
    }

    const saveEdits = () => {
        setedits(
            edits.forEach(element =>{
                if (element.id === id) {
                    element[present].splice(Index, 1, tex)
                }
            })
        )

        db.collection('users').doc(currentUser.uid).update({
            boards: edits
        })
        toggle()
    }
    return (
        <div className="listModal" style={styles}>
            <div className="listContent">
                <textarea rows="6" value={tex} onChange={(e) => settex(e.currentTarget.value)} />
                <button onClick={saveEdits}>Save</button>
                <button onClick={toggle}>Cancel</button>
            </div>
            <div className="listOption">
                <ul>
                    <li onClick={moveCard}>Move</li>
                    <li onClick={() => { deleteItem(val); toggle() }}>Delete</li>
                    <li onClick={expire}>Set timeline</li>
                </ul>
            </div>
            <>
                <MoveOption edits={edits} option1={option1} option2={option2} Index={Index} showMove={showMove} val={val} present={present} moveCard={moveCard} toggle={toggle} id={id} />
            </>
            <>
                <Timeline expire={expire} timeline={timeline} />
            </>

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
        edits.forEach(element =>{
            if (element.id === id) {
                element[present].splice(Index,1)
                element[moveto].splice(pos - 1,0,val)
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: edits
        })
        moveCard()
        toggle()
    }
    return (
        <div style={moveStyles} className="moveOption">
            <h2>Move Card</h2>
            <select value={moveto} onChange={moveDestination}>
                <option>Select</option>
                <option>{option1}</option>
                <option>{option2}</option>
                <option>{present}</option>
            </select>
            <input type="number" placeholder="position eg: 1" value={pos} onChange={movePosition} />
            <button onClick={moveTodo}>Move</button>
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

