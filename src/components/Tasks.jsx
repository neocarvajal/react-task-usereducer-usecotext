import React, { useReducer, useContext, useRef } from 'react';

/**
 * Utiliza useReducer y useContext para poder gestionar 
 * tareas en un proyecto de React. El proyecto debe permitir:
 * 
 * 1 - Crear tareas | 2 - Borrar tareas | 3 - Filtrar tareas
 */


const Tasks = () => {

    const CREATE = 'CREATE';
    const ERASE = 'ERASE';
    const FILTER = 'FILTER';

    const initialState = [
        {
            name: '',
            description: '',
            id: 0,
            completed: false,
            show: true,
        }
    ];

    const taskContext = React.createContext(null);

    const reducerTask = (state, action) => {

        switch (action.type) {
            case CREATE:
                console.log('CREATE');
                return [
                    ...state,
                    {
                        name: action.payload.name,
                        // description: action.payload.description,
                        id: action.payload.quantity,
                        completed: false,
                        show: true
                    }
                ]
            case ERASE:
                console.log('ERASE');
                return state.filter((_, id) => id !== action.payload.id)
            case FILTER:
                console.log('FILTER COMPLETED');
                return state.map((task) => 
                    (task.id === action.payload.id)
                    ?
                    {
                        name: task.name,
                        // description: task.description,
                        id: task.id,
                        completed: !task.completed,
                        show:true,
                    }
                    :
                    task
                )

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducerTask, initialState);

    const Taskcount = () => {
        const state = useContext(taskContext);

        let count = Object.keys(state).length -1;

        return (
            <pre>
                Task Count: {count}
                
            </pre>
        )
    }

    const nameForm = useRef('');
    // const descriptionForm = useRef('');

    const handleSubmit = (e) => {
        // e.preventDefault();
        dispatch({            
            type: CREATE,
            payload: {
                name: nameForm.current.value,
                // description: descriptionForm.current.value,
                quantity: Object(state).length,
                count: 1
            }
        })
    }

    const Taskform = () => {

        return (
            <taskContext.Provider value={state}>
                <Taskcount />
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Task name' ref={nameForm} />
                    {/* <input type='text' placeholder='Task description' ref={descriptionForm} /> */}
                    <button type='submit'>
                    CREATE TASK
                    </button>
                </form>
            </taskContext.Provider>
        );
    }

    const EraseBtn = ({id}) => {

        const handleErase = (e) => {
            e.preventDefault();
            dispatch({
                type: ERASE,
                payload: {
                    id:id
                }
            });
        };

        return (
            <button type='primary' id={id} onClick={handleErase}>
                Borrar
            </button>
        )
    }

    return (
        <div>
            <h1>Task's</h1>
            
                {
                    state.length !== 1 ? 
                    (
                        state.map((task, index) => {
                            return (
                                <ul key={index}>
                                    <li
                                        style={{
                                            listStyleType: 'none',
                                            textDecoration: task.completed ? 'line-through': 'none',
                                            textDecorationColor: task.completed ? 'red': 'none',
                                            cursor: 'pointer',
                                            padding: 0,
                                            margin: 0 
                                        }}

                                        onClick={() => dispatch({
                                            type: FILTER,
                                            payload: {
                                                id:task.id
                                            }
                                        })}
                                    >
                                        {
                                            task.id !== 0 ? 
                                            (
                                                <>
                                                    {task.id} - Name: {task.name} <EraseBtn id={task.id} />
                                                    {/* {task.id} - Name: {task.name} | Description: {task.description} <EraseBtn id={task.id} /> */}
                                                </>
                                            ):null
                                        }
                                       
                                    </li>
                                </ul>
                            );
                        })
                    )
                    :
                    null
                }
                    
                <Taskform />
        </div>
    );
}

export default Tasks;