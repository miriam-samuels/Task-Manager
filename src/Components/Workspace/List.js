import React, { useState, memo } from 'react'
import CardModal from './cardModal';

const Todo = ({ lists,list,boards,listName }) => {
    const [show, setshow] = useState(false);
    const [selected, setselected] = useState("")
    const [Index, setIndex] = useState(0)
    const toggle = ()  => {
        setshow(show => !show)
    }
    const select = (item, index) => {
        setselected(item);
        setIndex(index);
    }
    return (
        <>
            <ul>
                {
                    list.map((item, index) => (
                        <li key={index}>
                            <button className="deleteBoard" onClick={() => {toggle();select(item, index)}}>•••</button>
                            {
                                item.strikedOut ? 
                                <span><del>{item.name}</del></span>:
                                <span>{item.name}</span>
                            }
                        </li>
                    ))
                }
            </ul>
            {
                show ?
                    <CardModal val={selected} boards={boards} Index={Index} lists={lists} list={list} present={listName} show={show} toggle={toggle} /> :
                    <></>
            }
        </>
    );
};

export default memo(Todo)