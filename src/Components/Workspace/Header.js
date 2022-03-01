import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { LogoWhite } from '../shared/Images'

function Header(props) {
    const { currentUser } = useAuth()
    if (props.board) {
        return (
            <>
                <div className="workspacenav">
                    <div className="workspacenav--first">

                    </div>
                    <div className="workspacenav--second">
                        <span><Link to={`/dashboard/main/${currentUser.uid}`}><img src={LogoWhite} alt="pic" /></Link></span>
                    </div>
                    <div className="workspacenav--third">

                    </div>

                </div>
                <div className="workspace--bar">
                    <div className="buttons">
                        <button><i className='cil-folder-open'></i> Board</button>
                        <button> {props.board.title}</button>
                        <button onClick={props.toggleStar}>{props.starred ? <span className='cil-star'>★</span> : <i className='cil-star'></i>}</button>
                        <button><i className='cil-clock'></i>  {props.board.timestamp}</button>
                        <button><i className='cil-https'></i>  {props.board.visibility}</button>
                        <button><i className='cil-envelope-closed'></i>  Invite</button>
                        <button>... Show Menu</button>
                    </div>
                </div>
            </>
        )
    }
    else return <></>
}

export default Header
