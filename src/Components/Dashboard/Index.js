import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { db } from '../Firebase/Firebase';
import Loader from '../shared/Loader';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import {
    Background1,
    Background2,
    Background3,
    Background5,
    Background6,
    Background7,
    Background8,
    Background9,
    Background10,
    Background11,
    Background12,
    Background13,
    Background14,
    Background15
} from '../shared/Images'
import Modal from '../shared/Modal';



function Index() {
    const [boards, setboards] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const { theme, currentUser, themeCheck } = useAuth()
    useEffect(() => { const subscribe = getBoards(); return subscribe }, [])

    const changeLoadingState = () => setisLoading(current => !current)



    const getBoards = async () => {
        changeLoadingState()
        await db.collection('users').doc(currentUser.uid).get()
            .then(doc => { if (doc.exists) { setboards(doc.data().boards) }; changeLoadingState() })
    }

    const starBoard = async (id) => {
        const data = boards.map(item => { if (item.id === id) { item.starred = !item.starred } return item })
        setboards(data)
        await db.collection('users').doc(currentUser.uid).update({
            boards: data
        })
    }


    const starredBoards = boards.filter((item) => item.starred)
    return (
        <div className="dashboard" style={themeCheck ? theme.light : theme.light}>
            <div className="personalBoard">
                {
                    starredBoards.length > 0 &&
                    <div>
                        <h6>Starred Boards</h6>
                        <StarredBoards boards={starredBoards} starBoard={starBoard} />
                    </div>
                }
                <div>
                    <h6>All Boards</h6>
                    <Boards changeLoadingState={changeLoadingState} boards={boards} setboards={setboards} starBoard={starBoard} />
                </div>
                <Loader isLoading={isLoading} />
            </div>
        </div>
    )
}

export default Index

function Boards(props) {
    const [showModal, setshowModal] = useState(false);
    const [title, settitle] = useState('');
    const [visibility, setvisibility] = useState('private');
    const [background, setbackground] = useState("")
    const [deleteModal, setdeleteModal] = useState(false)

    const [currentBoard, setcurrentBoard] = useState("")
    const { currentUser, generateId } = useAuth()
    const timestamp = new Date();
    const history = useHistory()

    const navigate = (id) => history.push(`/workspace/${id}`)

    const toggle = () => setshowModal(current => !current);
    const deletetoggle = () => setdeleteModal(current => !current);


    const show = { display: showModal ? "block" : "none" };
    const delStyle = { display: deleteModal ? "block" : "none" };

    const handleChange = (e) => settitle(e.target.value);

    const handleVisibility = (e) => setvisibility(e.target.value);

    const handleBg = (e) => setbackground(e)

    const handleSubmit = async () => {
        if (title.length === 0) {
            return;
        };
        props.changeLoadingState()
        const id = generateId();
        await db.collection('users').doc(currentUser.uid).update({
            boards: firebase.firestore.FieldValue.arrayUnion({
                id: id,
                title: title,
                timestamp: timestamp.toLocaleDateString(),
                visibility: visibility,
                starred: false,
                background: background,
                lists: [
                    { name: "todo", cards: [], isWriting: false, },
                    { name: "doing", cards: [], isWriting: false, },
                    { name: "done", cards: [], isWriting: false, },
                ],
            })
        })
            .then(() => { console.log("Document successfully written!"); props.changeLoadingState(); history.push(`/workspace/${id}`) })
            .catch(error => console.error("Error writing document: ", error))
        settitle('');
        setshowModal(current => !current);
    }
    const starredStyle = {
        color: 'goldenrod'
    } 
    return (
        <div>
            <ul className="boards">
                <li className="boards--create boards--list" onClick={toggle}><b>Create new board</b> </li>
                {
                    props.boards.map((board) => (
                        <li key={board.id} className="boards--list"
                            style={{
                                backgroundImage: `url(${board.background}) , url(${Background1})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }} >
                            <h5 onClick={() => navigate(board.id)}>{board.title}</h5>
                            <button className="boards--options" onClick={() => { deletetoggle(); setcurrentBoard(board.id); }}><i className='cil-pen'></i></button>
                            <button className="boards--star" onClick={() => props.starBoard(board.id)}><i style={board.starred ? starredStyle : null} className='cil-star'></i></button>
                        </li>
                    ))}
            </ul>
            <AddBoard
                styles={show}
                toggle={toggle}
                title={title}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                visibility={visibility}
                handleVisibility={handleVisibility}
                handleBg={handleBg}
                boards={props.boards}
            />
            <DeleteBoard
                delStyle={delStyle}
                deletetoggle={deletetoggle}
                id={currentBoard}
                boards={props.boards}
                setboards={props.setboards}
            />

        </div>
    );
};

function StarredBoards(props) {

    const [deleteModal, setdeleteModal] = useState(false)

    const [currentBoard, setcurrentBoard] = useState("")
    const { currentUser } = useAuth()
    const history = useHistory()

    const navigate = (id) => history.push(`/workspace/${id}`)

    const deletetoggle = () => setdeleteModal(current => !current);
    const starredStyle = {
        color: 'goldenrod'
    }
    return (
        <div>
            <ul className="boards">
                {
                    props.boards.map((board) => (
                        <li key={board.id} className="boards--list"
                            style={{
                                backgroundImage: `url(${board.background}) , url(${Background1})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }} >
                            <h5 onClick={() => navigate(board.id)}>{board.title}</h5>
                            <button className="boards--options" onClick={() => { deletetoggle(); setcurrentBoard(board.id); }}><i className='cil-pen'></i></button>
                            <button className="boards--star" onClick={() => props.starBoard(board.id)}><i style={board.starred ? starredStyle : null} className='cil-star'></i></button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

function AddBoard(props) {

    const titlesearch = props.boards.filter(element => element.title === props.title);
    let titlecheck = titlesearch.length === 0 ? '.' : titlesearch[0].title;
    const checkboards = props.title === titlecheck || props.title === ""
    const setFeedback = () => { if (titlecheck.toLowerCase() === props.title.toLowerCase()) return { __html: 'Board already exists' }; else return { __html: '' } };

    const background = (e) => { document.getElementById("img").src = e.target.src; props.handleBg(e.target.src); }

    return (
        <div className="modal--con" style={props.styles}>
            <div className="modal--body">
                <div>
                    <div className="board--header">
                        <div className="board--details">
                            <input type="text" placeholder="Add board title" value={props.title} onChange={props.handleChange} />
                            <p dangerouslySetInnerHTML={setFeedback()} style={{ color: 'white' }} />
                            <select value={props.visibility} onChange={props.handleVisibility}>
                                <option>Private</option>
                                <option>Public</option>
                            </select>
                        </div>
                        <img src={Background1} id="img" alt="pic" />
                    </div>
                    <div className="background">
                        <span><img src={Background1} alt="pic" onClick={background} /> </span>
                        <span><img src={Background2} alt="pic" onClick={background} /> </span>
                        <span><img src={Background12} alt="pic" onClick={background} /> </span>
                        <span><img src={Background13} alt="pic" onClick={background} /> </span>
                        <span><img src={Background14} alt="pic" onClick={background} /> </span>
                        <span><img src={Background15} alt="pic" onClick={background} /> </span>
                        <span><img src={Background3} alt="pic" onClick={background} /> </span>
                        <span><img src={Background9} alt="pic" onClick={background} /></span>
                        <span><img src={Background10} alt="pic" onClick={background} /></span>
                        <span><img src={Background11} alt="pic" onClick={background} /></span>
                        <span><img src={Background5} alt="pic" onClick={background} /></span>
                        <span><img src={Background6} alt="pic" onClick={background} /></span>
                        <span><img src={Background7} alt="pic" onClick={background} /></span>
                        <span><img src={Background8} alt="pic" onClick={background} /></span>
                    </div>
                    <div className="modal--btns">
                        <button disabled={checkboards} onClick={() => props.handleSubmit()}>Create Board</button>
                        <button onClick={props.toggle}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DeleteBoard = (props) => {

    const { currentUser } = useAuth()

    const deleteBoard = () => {
        const data = props.boards.filter(elem => elem.id !== props.id)
        props.setboards(data)
        console.log(props.boards)
        db.collection('users').doc(currentUser.uid).update({ boards: data })
            .then(() => console.log("Document successfully deleted!"))
        props.deletetoggle()
    }
    return (
        <Modal styles={props.delStyle}>
            <div className="moveOption" >
                <div>
                    <h2>Delete Board</h2>
                    <button onClick={deleteBoard}>Delete</button>
                    <button onClick={props.deletetoggle}>Cancel</button>
                </div>
            </div>
        </Modal>
    )
}


