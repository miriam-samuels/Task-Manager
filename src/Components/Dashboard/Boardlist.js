import React,{useState} from 'react'
import Background1 from '../Images/bg3.jpg';
import { useHistory } from 'react-router-dom';
import { db } from '../Firebase/Firebase';
import { useAuth } from '../Context/AuthContext';

function BoardList({ boards }) {
    const [showDelMsg, setshowDelMsg] = useState(false)
    const [boardId, setboardId] = useState("")
    const history = useHistory()

    const navigate = (id) => {
        history.push(`/workspace/${id}`)
    }
    const toggle = () => {
        setshowDelMsg(current => !current)
    }

    return (
        <>
            {
                boards.map((board) => (
                    <li key={board.id} className="boardlist" style={{ backgroundImage: `url(${board.background}) , url(${Background1})`, backgroundSize: "cover", backgroundPosition: "center" }} >
                        <button className="deleteBoard" onClick={() => {setboardId(board.id);toggle()}}>X</button>
                        <h2 onClick={() => navigate(board.id)}>{board.title}</h2>
                    </li>
                ))}
                <DelMsg showDelMsg={showDelMsg} boardId={boardId} boards={boards} toggle={toggle}/>
        </>
    )
}
export default BoardList
const DelMsg = ({ boards,boardId,showDelMsg,toggle }) => {

    const { currentUser } = useAuth()

    const delStyle = {
        display: showDelMsg ? "block" : "none"
    }
    const deleteBoard = () => {
        db.collection('users').doc(currentUser.uid).update({
            boards: boards.filter(elem => elem.id !== boardId)
        })
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch(error => {
                console.error("Error writing document: ", error);
            });
    }
    return(
        <div className="moveOption" style={delStyle} >
            <h2>Delete Card</h2>
            <button onClick={deleteBoard}>Delete</button>
            <button onClick={toggle}>Cancle</button>
        </div>
    )
}

