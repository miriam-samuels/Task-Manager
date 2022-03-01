import React, { useEffect, useState, memo } from 'react'
import { db } from '../Firebase/Firebase';
import { useAuth } from '../Context/AuthContext';
import CardModal from './cardModal';
function Workspace(props) {
    const { currentUser } = useAuth();
    const [todo, settodo] = useState("")
    const [color, setcolor] = useState("")
    const [boards, setboards] = useState(props.boards)
    const [board] = useState(props.board)
    const [listTitle, setlistTitle] = useState("")
    const [addListToggle, setaddListToggle] = useState(false)

    const disableAddTodo = todo === "";

    const addTodo = (name) => {
        const newCard = { board: board.title, color: color, description: "", dueDate: new Date(), name: todo, strikedOut: false, }
        const lists = board.lists.map(list => { if (list.name === name) list.cards.splice(0, 0, newCard); return list })
        setboards(boards.map(board => { if (board.id === props.id) { board.lists = lists }; return board }))
        db.collection('users').doc(currentUser.uid).update({ boards: boards })
        settodo('')
    };

    const toggleTextArea = (name) => {
        let newLists = board.lists.map(list => {
            if (list.name === name) list.isWriting = !list.isWriting; else list.isWriting = false; return list
        })
        setboards(boards.map(board => { if (board.id === props.id) { board.lists = newLists }; return board }))
        db.collection('users').doc(currentUser.uid).update({ boards: boards })
    };

    const addList = () => {
        const newList = { name: listTitle, cards: [], isWriting: false, };
        board.lists = [...board.lists, newList]
        setboards(boards.map(board => { if (board.id === props.id) { board.lists = [...board.lists, newList] }; return board }))
        db.collection('users').doc(currentUser.uid).update({ boards: boards })
        setlistTitle("")
        setaddListToggle(current => !current)
    }

    return (
        <div className="workspace">
            <div className="workspacelist" >
                <div className="wk">
                    <div className="todoCon">
                        {
                            board.lists.map((list, index) => (
                                <div className="todo" key={index}>
                                    <div>
                                        <b>{list.name}</b>
                                        <button className="more" >•••</button>
                                        <Card lists={board.lists} list={list} cards={list.cards} board={board} boards={boards} setboards={setboards} />
                                        <span className="addCard" style={{ display: list.isWriting ? 'none' : 'block' }} onClick={() => toggleTextArea(list.name)}><i className='cil-plus'></i> Add a card</span>
                                    </div>
                                    <div className="add" style={{ display: list.isWriting ? 'block' : 'none' }}>
                                        <textarea placeholder="Enter a title for this card..." value={todo} onChange={(e) => settodo(e.currentTarget.value)} />
                                        <div style={{ margin: '5px 0' }}>
                                            <label>Pick a color</label><input type="color" value={color} onChange={(e) => setcolor(e.currentTarget.value)} />
                                        </div>
                                        <button className="addCardBtn" onClick={() => addTodo(list.name)} disabled={disableAddTodo}>Add Card</button>
                                        <button className="closeCardBtn" onClick={() => toggleTextArea(list.name)}>X</button>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            addListToggle ?
                                <div className="todo addList">
                                    <input type="text" placeholder="Enter list title" value={listTitle} onChange={(e) => setlistTitle(e.target.value)} />
                                    <button onClick={addList}>Add List</button>
                                    <b onClick={() => setaddListToggle(current => !current)}>X</b>
                                </div> :
                                <div className="todo addListBtn" onClick={() => setaddListToggle(current => !current)}><i className='cil-plus'></i> Add another list</div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Workspace

const Card = (props) => {
    const [showModal, setshowModal] = useState(false)
    const [selected, setselected] = useState("")
    const [Index, setIndex] = useState(0)

    const toggleModal = () => setshowModal(current => !current)
    const select = (item, index) => { setselected(item); setIndex(index) }
    return (
        <>
            <ul>
                {
                    props.cards.map((item, index) => (
                        <li key={index} style={{ borderLeft: `5px solid ${item.color}` }}>
                            <button className="openCardBtn" onClick={() => { toggleModal(); select(item, index) }}><i className='cil-pen'></i></button>
                            {item.strikedOut ? <span><del>{item.name}</del></span> : <span>{item.name}</span>}
                        </li>
                    ))
                }
            </ul>
            {
                showModal ?
                    <CardModal
                        val={selected}
                        boards={props.boards}
                        Index={Index}
                        lists={props.lists}
                        list={props.list}
                        cards={props.cards}
                        setboards={props.setboards}
                        present={props.list.name}
                        show={showModal}
                        toggle={toggleModal}
                    /> :
                    <></>
            }
        </>
    );
};
