import React, { useState } from 'react'
import ListModal from './listModal';

export const Todo = ({ Todos, deleteItem }) => {
    const [show, setshow] = useState(false);
    const [selected, setselected] = useState("")
    const [Index, setIndex] = useState(0)
    
    const toggle = () => {
        setshow(show => !show)
    }
    const select = (item, index) => {
        setselected(item)
        setIndex(index)
    }
    return (
        <>
            <ul>
                {
                    Todos.map((item, index) => (
                        <li key={index}>
                            <button className="deleteBoard" onClick={() => { toggle(); select(item, index) }}>•••</button>
                            <span>{item}</span>
                        </li>
                    ))
                }
            </ul>
            {
                show ?
                    <ListModal val={selected} Index={Index} present="todo" option1='doing' option2="done" deleteItem={deleteItem} show={show} toggle={toggle} /> :
                    <></>
            }
        </>
    );
};

export const Doin = ({ Doing, deleteItem }) => {
    const [show, setshow] = useState(false);
    const [selected, setselected] = useState("")
    const [Index, setIndex] = useState(0)
    

    const toggle = () => {
        setshow(show => !show)
    }
    const select = (item, index) => {
        setselected(item)
        setIndex(index)
    }
    return (
        <>
            <ul>
                {
                    Doing.map((item, index) => (
                        <li key={index}>
                            <button className="deleteBoard" onClick={() => { toggle(); select(item, index) }}>•••</button>
                            <span>{item}</span>
                        </li>
                    ))
                }
            </ul>
            {
                show ?
                    <ListModal val={selected} Index={Index} present="doing" option1='todo' option2="done" deleteItem={deleteItem} show={show} toggle={toggle} /> :
                    <></>
            }
        </>
    );
};

export const Don = ({ Done, deleteItem }) => {
    const [show, setshow] = useState(false);
    const [selected, setselected] = useState("")
    const [Index, setIndex] = useState(0)
    

    const toggle = () => {
        setshow(show => !show)
    }
    const select = (item, index) => {
        setselected(item)
        setIndex(index)
    }
    return (
        <>
            <ul>
                {
                    Done.map((item, index) => (
                        <li key={index}>
                            <button className="deleteBoard" onClick={() => { toggle(); select(item, index) }}>•••</button>
                            <span>{item}</span>
                        </li>
                    ))
                }
            </ul>
            {
                show ?
                    <ListModal val={selected} Index={Index} present="done" option1="todo" option2="doing" deleteItem={deleteItem} show={show} toggle={toggle} /> :
                    <></>
            }

        </>
    );
};
