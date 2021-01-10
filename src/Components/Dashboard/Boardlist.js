import React from 'react'
import Background3 from '../Images/house4.jpg';
import { useHistory } from 'react-router-dom';
import { db } from '../Firebase/Firebase';

function BoardList({ boards }) {
    const history = useHistory()


    const navigate = (id) => {
        history.push(`/workspace/${id}`)
    }
    const deleteBoard = (id) => {
        db.collection('boards').doc(id).delete()
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
                    <li key={board.id} className="boardlist" style={{backgroundImage:`url(${board.background}) , url(${Background3})` , backgroundSize: "cover"}} >
                        <button className="deleteBoard" onClick={() => deleteBoard(board.id)}>X</button>
                        <h2 onClick={() => navigate(board.id)}>{board.title}</h2>
                    </li>
                ))}
        </>
    )
}
export default BoardList

