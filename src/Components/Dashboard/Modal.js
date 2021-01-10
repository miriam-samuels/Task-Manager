import React from 'react'
import Background1 from '../Images/house2.jpg';
import Background2 from '../Images/house3.jpg';
import Background3 from '../Images/house4.jpg';
import Background4 from '../Images/house5.jpg';
import Background5 from '../Images/blue.jpg';
import Background6 from '../Images/goldenrod.jpg';
import Background7 from '../Images/green.jpg';
import Background8 from '../Images/marron.jpg';
function Modal({ styles,title,handleChange,handleSubmit,visibility,handleVisibility,toggle,handleBg }) {

    const background = (e) => {
        document.getElementById("img").src = e.target.src;
        handleBg(e.target.src)
    }
    return (
        <div id="modal" style={styles}>
            <div className="modal">
                <div>
                    <img src={Background3} id="img" alt="pic" />
                    <div className="title">
                        <input type="text" placeholder="Add board title" value={title} onChange={handleChange}/>
                        <select value={visibility} onChange={handleVisibility}>
                            <option>Private</option>
                            <option>Public</option>
                        </select>
                    </div>
                </div>
                <div className="background">
                    <span><img src={Background1} alt="pic" onClick={background} /> </span>
                    <span><img src={Background2} alt="pic" onClick={background} /> </span>
                    <span><img src={Background3} alt="pic" onClick={background} /> </span>
                    <span><img src={Background4} alt="pic" onClick={background} /> </span>
                    <span ><img src={Background5} alt="pic" onClick={background} /></span>
                    <span><img src={Background6} alt="pic" onClick={background} /></span>
                    <span><img src={Background7} alt="pic" onClick={background} /></span>
                    <span><img src={Background8} alt="pic" onClick={background} /></span>
                </div>
                <div className="new">
                    <button onClick={handleSubmit}>Create Board</button>
                    <button onClick={toggle}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default React.memo(Modal)
