
export const Todo = ({ Todos, deleteItem }) => {
    return (
        <ul>
            {
                Todos.map((item, index) => (
                    <li key={index}>
                        <button className="deleteBoard" onClick={() => deleteItem(item)}>X</button>
                            {item}
                    </li>
                ))
            }
        </ul>
    );
};
export const Doin = ({ Doing, deleteItem }) => {
    return (
        <ul>
            {
                Doing.map((item, index) => (
                    <li key={index}>
                        <button className="deleteBoard" onClick={() => deleteItem(item)}>X</button>
                           {item}
                    </li>
                ))
            }
        </ul>
    );
};
export const Don = ({ Done, deleteItem }) => {
    return (
        <ul>
            {
                Done.map((item, index) => (
                    <li key={index}>
                        <button className="deleteBoard" onClick={() => deleteItem(item)}>X</button>
                            {item}
                    </li>
                ))
            }
        </ul>
    );
};
