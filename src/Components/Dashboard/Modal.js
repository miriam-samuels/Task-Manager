import React from 'react'
import Background1 from '../Images/bg3.jpg';
import Background2 from '../Images/bg4.jpg';
import Background3 from '../Images/house4.jpg';
import Background5 from '../Images/blue.jpg';
import Background6 from '../Images/goldenrod.jpg';
import Background7 from '../Images/green.jpg';
import Background8 from '../Images/marron.jpg';
import Background9 from '../Images/bg.jpg';
import Background10 from '../Images/bg1.jpg';
import Background11 from '../Images/bg2.jpg';
import Background12 from '../Images/bg5.jpg';
import Background13 from '../Images/bg6.jpg';
import Background14 from '../Images/bg7.jpg';
import Background15 from '../Images/bg8.jpg';
function Modal({ styles, title, handleChange, handleSubmit, visibility, handleVisibility, toggle, handleBg, boards }) {
    let titlecheck;
    const background = (e) => {
        document.getElementById("img").src = e.target.src;
        handleBg(e.target.src)
    }
    boards.forEach(element => {
        if (element.title === title) {
            titlecheck = element.title
        }
    });
    const setp = () => {
        if (titlecheck === title) return { __html: 'Name already exists' };
        else return { __html: '' };
    }
    const checkboards = title === titlecheck || title === ""

    return (
        <div id="modal" style={styles}>
            <div className="modal">
                <div>
                    <img src={Background1} id="img" alt="pic" />
                    <div className="title">
                        <input type="text" placeholder="Add board title" value={title} onChange={handleChange} />
                        <p dangerouslySetInnerHTML={setp()} />
                        <select value={visibility} onChange={handleVisibility}>
                            <option>Private</option>
                            <option>Public</option>
                        </select>
                    </div>
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
                <div className="new">
                    <button disabled={checkboards} onClick={handleSubmit}>Create Board</button>
                    <button onClick={toggle}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default Modal
