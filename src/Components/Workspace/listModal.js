import React from 'react'
import { db } from '../Firebase/Firebase';
import { useAuth } from '../Context/AuthContext';
function ListModal({show,toggle,listDetails,boards,id}) {
    const { currentUser } = useAuth()
    const styles = {
        display: show ? 'block' : 'none',
        top:"35%"
    }
    const deleteBoard = () => {
        let boardsClone = boards;
        boardsClone.forEach(elem => {
            if (elem.id === id) {
                elem.lists = elem.lists.filter(list => list.name !== listDetails.name)
            }
        })
        db.collection('users').doc(currentUser.uid).update({
            boards: boardsClone
        })
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch(error => {
                console.error("Error writing document: ", error);
            });
        toggle()
    }
    return (
        <div className="moveOption" style={styles} >
            <h2>Delete Card</h2>
            <h3>Are you sure you want to delete list {listDetails.name}</h3>
            <button onClick={deleteBoard}>Delete</button>
            <button onClick={toggle}>Cancel</button>
        </div>
    )
}

export default ListModal
