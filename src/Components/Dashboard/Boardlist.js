import React from 'react'
import Background1 from '../Images/bg3.jpg';
import { useHistory } from 'react-router-dom';
import { db } from '../Firebase/Firebase';
import { useAuth } from '../Context/AuthContext';

function BoardList({ boards }) {
    const { currentUser } = useAuth()
    const history = useHistory()


    const navigate = (id) => {
        history.push(`/workspace/${id}`)
    }
    const deleteBoard = (id) => {
        db.collection('users').doc(currentUser.uid).update({
            boards: boards.filter(elem => elem.id !== id)
        })
        .then(() => {
            console.log("Document successfully deleted!");
        })
        .catch(error => {
            console.error("Error writing document: ", error);
        });
    }
    return (
        <>
            {
                boards.map((board) => (
                    <li key={board.id} className="boardlist" style={{backgroundImage:`url(${board.background}) , url(${Background1})` , backgroundSize: "cover",backgroundPosition:"center"}} >
                        <button className="deleteBoard" onClick={() => deleteBoard(board.id)}>X</button>
                        <h2 onClick={() => navigate(board.id)}>{board.title}</h2>
                    </li>
                ))}
        </>
    )
}
export default BoardList

