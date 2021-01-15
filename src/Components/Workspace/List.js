import React, { useState } from 'react'
import ListModal from './listModal';

export const Todo = ({ Todos, deleteItem }) => {
    const [show, setshow] = useState(false);
    const [selected, setselected] = useState("")
    const toggle = () => {
        setshow(show => !show)
    }
    const select = (item) => {
        setselected(item)
    }
    return (
        <>
            <ul>
                {
                    Todos.map((item, index) => (
                        <li key={index}>
                            <button className="deleteBoard" onClick={() => { toggle(); select(item) }}>•••</button>
                            <span>{item}</span>
                        </li>
                    ))
                }
            </ul>
            <ListModal val={selected} present="todo" option1='doing' option2="done" deleteItem={deleteItem} show={show} toggle={toggle} />
        </>
    );
};

export const Doin = ({ Doing, deleteItem }) => {
    const [show, setshow] = useState(false);
    const [selected, setselected] = useState("")
    const toggle = () => {
        setshow(show => !show)
    }
    const select = (item) => {
        setselected(item)
    }
    return (
        <>
            <ul>
                {
                    Doing.map((item, index) => (
                        <li key={index}>
                            <button className="deleteBoard" onClick={() => { toggle(); select(item) }}>•••</button>
                            <span>{item}</span>
                        </li>
                    ))
                }
            </ul>
            <ListModal val={selected} present="doing" option1='todo' option2="done" deleteItem={deleteItem} show={show} toggle={toggle} />
        </>
    );
};

export const Don = ({ Done, deleteItem }) => {
    const [show, setshow] = useState(false);
    const [selected, setselected] = useState("")

    const toggle = () => {
        setshow(show => !show)
    }
    const select = (item) => {
        setselected(item)
    }
    return (
        <>
            <ul>
                {
                    Done.map((item, index) => (
                        <li key={index}>
                            <button className="deleteBoard" onClick={() => { toggle(); select(item) }}>•••</button>
                            <span>{item}</span>
                        </li>
                    ))
                }
            </ul>
            <ListModal val={selected} present="done" option1="todo" option2="doing" deleteItem={deleteItem} show={show} toggle={toggle} />

        </>
    );
};
