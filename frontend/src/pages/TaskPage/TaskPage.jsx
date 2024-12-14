import React, {useEffect, useState} from 'react';
import "./TaskPage.css"
import userService from "../../axios/UserService.js";
function TaskPage(){

    const fetchTasks = async () => {
        try {
            const response = await userService.getTasks(sessionStorage.getItem("token"));

            setTasks(response);
        } catch (error) {
            console.error('Error fetching skins:', error);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);

    const [tasks, setTasks] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    const handleEdit = (id) => {
        alert(`Edit task with ID: ${id}`);
        // Add your edit logic here
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleAdd = () => {
        // const newTask = {
        //     id: Date.now(),
        //     title: "Nowy tytul",
        //     description: "Nowy opis",
        //     status: "NEW",
        //     customStatus: null,
        //     category: { id: 7, name: "zadania" },
        // };
        // setTasks([...tasks, newTask]);
        setShowAddForm(true);
    };

    return (
        <div className="task-table-container">
            <h1>Task Table</h1>
            <table className="task-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Custom Status</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.status}</td>
                        <td>{task.customStatus ? task.customStatus.name : "-"}</td>
                        <td>{task.category.name}</td>
                        <td>
                            <button className="edit-button" onClick={() => handleEdit(task.id)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={handleAdd}>Add New Task</button>
            {showAddForm && (<div className="add-form">
                <form >
                    <div style={{marginBottom: '1rem'}}>
                        <label htmlFor="login" style={{display: 'block', marginBottom: '.5rem'}}>Login:</label>
                        <input
                            type="text"
                            id="login"
                            value=""
                            onChange=""
                            required
                            style={{width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
                        />
                    </div>
                    <div style={{marginBottom: '1rem'}}>
                        <label htmlFor="password" style={{display: 'block', marginBottom: '.5rem'}}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value=""
                            onChange=""
                            required
                            style={{width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
                        />
                    </div>
                    {/*{error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}*/}
                    <button type="submit" style={{
                        padding: '.5rem 1rem',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: '#fff'
                    }}>
                        Login
                    </button>
                </form>
            </div>)}
        </div>
    );
};

export default TaskPage;