import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import { db } from '../Firebase/Firebase';
import { useRouteMatch } from 'react-router-dom';


const ListModal = ({ val, Index, option1, option2, deleteItem, show, toggle, present }) => {
    const [showMove, setshowMove] = useState(false);
    const [timeline, settimeline] = useState(false)
    const [edits, setedits] = useState([])
    const [tex, settex] = useState(val)

    const {
        params: { id },
    } = useRouteMatch('/workspace/:id');

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            db.collection('boards').doc(id).get().then(doc => {
                setedits(doc.data()[present])
            })
        }
        return () => { unmounted = true };
    }, [edits, present, id])

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
        edits.splice(Index, 1, tex)
        db.collection('boards').doc(id).update({
            [present]: edits
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
                    <li onClick={expire}>Set timeline</li>
                    <li onClick={moveCard}>Move</li>
                    <li onClick={() => { deleteItem(val); toggle() }}>Delete</li>
                </ul>
            </div>
            <>
                <MoveOption option1={option1} option2={option2} showMove={showMove} val={val} present={present} moveCard={moveCard} toggle={toggle} id={id} />
            </>
            <>
                <Timeline expire={expire} timeline={timeline} />
            </>
        </div>
    )
}
const MoveOption = ({ option1, option2, showMove, val, present, moveCard, toggle, id }) => {
    const [moveto, setmoveto] = useState('Select')

    const moveStyles = {
        display: showMove ? 'block' : 'none'
    }
    const moveDestination = (e) => {
        setmoveto(e.target.value)
    }
    const moveTodo = () => {
        db.collection('boards').doc(id).update({
            [moveto]: firebase.firestore.FieldValue.arrayUnion(val)
        })
        db.collection('boards').doc(id).update({
            [present]: firebase.firestore.FieldValue.arrayRemove(val)
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
            </select>
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
            <h2>Set Timeline(coming soon)</h2>
            <input type="date" />
            <input type="time" />
            <button>Save</button>
            <button onClick={() => expire()}>Cancel</button>
        </div>
    )

}
export default ListModal

