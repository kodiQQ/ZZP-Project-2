// import React, {useEffect, useState} from 'react';
// import "./TaskPage.css"
// import userService from "../../axios/UserService.js";
// function TaskPage(){
//     const [tasks, setTasks] = useState([]);
//     const [showAddForm, setShowAddForm] = useState(false);
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [statusId, setStatusId] = useState(0);
//     const [categoryId, setCategoryId] = useState(0);
//
//
//     const fetchTasks = async () => {
//         try {
//             const response = await userService.getTasks(sessionStorage.getItem("token"));
//
//             setTasks(response);
//         } catch (error) {
//             console.error('Error fetching skins:', error);
//         }
//     };
//     useEffect(() => {
//         fetchTasks();
//     }, []);
//
//
//
//     const handleEdit = (id) => {
//         alert(`Edit task with ID: ${id}`);
//         // Add your edit logic here
//     };
//
//     const handleDelete = (id) => {
//         setTasks(tasks.filter(task => task.id !== id));
//     };
//
//     const handleAdd = () => {
//         userService.addTasks(sessionStorage.getItem("token"),title, description, statusId,categoryId);
//     };
//
//     const handleShowForm = () => {
//         // const newTask = {
//         //     id: Date.now(),
//         //     title: "Nowy tytul",
//         //     description: "Nowy opis",
//         //     status: "NEW",
//         //     customStatus: null,
//         //     category: { id: 7, name: "zadania" },
//         // };
//         // setTasks([...tasks, newTask]);
//         setShowAddForm(!showAddForm);
//     };
//
//     return (
//         <div className="task-table-container">
//             <h1>Task Table</h1>
//             <table className="task-table">
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Title</th>
//                     <th>Description</th>
//                     <th>Status</th>
//                     <th>Category</th>
//                     <th>Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {tasks.map(task => (
//                     <tr key={task.id}>
//                         <td>{task.id}</td>
//                         <td>{task.title}</td>
//                         <td>{task.description}</td>
//                         <td>{task.customStatus ? task.customStatus.name : "-"}</td>
//                         <td>{task.category.name}</td>
//                         <td>
//                             <button className="edit-button" onClick={() => handleEdit(task.id)}>Edit</button>
//                             <button className="delete-button" onClick={() => handleDelete(task.id)}>Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             <button className="add-button" onClick={handleShowForm}>Add New Task</button>
//             {showAddForm && (<div className="add-form">
//                 <form onSubmit={handleAdd}>
//                     <div style={{marginBottom: '1rem'}}>
//                         <label htmlFor="title" style={{display: 'block', marginBottom: '.5rem'}}>Title:</label>
//                         <input
//                             type="text"
//                             id="title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             required
//                             style={{width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
//                         />
//                     </div>
//                     <div style={{marginBottom: '1rem'}}>
//                         <label htmlFor="description"
//                                style={{display: 'block', marginBottom: '.5rem'}}>Description:</label>
//                         <input
//                             type="text"
//                             id="description"
//                             value={description}
//                             onChange={(e) => setDescription(e.target.value)}
//                             required
//                             style={{width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
//                         />
//                     </div>
//                     <div style={{marginBottom: '1rem'}}>
//                         <label htmlFor="statusId"
//                                style={{display: 'block', marginBottom: '.5rem'}}>Status ID:</label>
//                         <input
//                             type="number"
//                             id="statusId"
//                             value={statusId}
//                             onChange={(e) => setStatusId(e.target.value)}
//                             required
//                             style={{width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
//                         />
//                     </div>
//                     <div style={{marginBottom: '1rem'}}>
//                         <label htmlFor="categoryId"
//                                style={{display: 'block', marginBottom: '.5rem'}}>CategoryId:</label>
//                         <input
//                             type="number"
//                             id="categoryId"
//                             value={categoryId}
//                             onChange={(e) => setCategoryId(e.target.value)}
//                             required
//                             style={{width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
//                         />
//                     </div>
//                     {/*{error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}*/}
//                     <button onClick={handleShowForm} style={{
//                         padding: '.5rem 1rem',
//                         borderRadius: '4px',
//                         border: 'none',
//                         backgroundColor: '#007BFF',
//                         color: '#fff'
//                     }}>
//                         Anuluj
//                     </button>
//
//                     <button type="submit" style={{
//                         padding: '.5rem 1rem',
//                         borderRadius: '4px',
//                         border: 'none',
//                         backgroundColor: '#007BFF',
//                         color: '#fff'
//                     }}>
//                         Zapisz
//                     </button>
//
//                 </form>
//             </div>)}
//         </div>
//     );
// };
//
// export default TaskPage;



import React, { useEffect, useState } from 'react';
import "./TaskPage.css";
import userService from "../../axios/UserService.js";

function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null); // Dodano stan na edytowane zadanie
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [statusId, setStatusId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);

    const fetchTasks = async () => {
        try {
            const response = await userService.getTasks(sessionStorage.getItem("token"));
            setTasks(response);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleEdit = (task) => {
        let id=task.id;
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setTitle(task.title);
            setDescription(task.description);
            setStatusId(task.customStatus.id);
            setCategoryId(task.category.id);
            setEditTaskId(id); // Ustawiamy ID edytowanego zadania
            setShowAddForm(true); // Pokazujemy formularz
        }
    };

    const handleDelete = (task) => {
        userService.deleteTask(sessionStorage.getItem("token"),task.id);
        location.reload();
    };

    const handleAdd = () => {
        // e.preventDefault();
        console.log("handleAdd");
        if (editTaskId) {
            console.log("1111111");
            // Jeśli edytujemy, wywołujemy aktualizację zadania
            userService.updateTask(sessionStorage.getItem("token"), editTaskId, title, description, statusId, categoryId)
                .then(() => {
                    setTasks(tasks.map(task => task.id === editTaskId ? { ...task, title, description, statusId, categoryId } : task));
                    setEditTaskId(null);
                    setShowAddForm(false);
                });
        } else {
            console.log("222222");
            // Jeśli dodajemy, wywołujemy metodę dodawania zadania
            userService.addTasks(sessionStorage.getItem("token"), title, description, statusId, categoryId)
                .then(newTask => {
                    setTasks([...tasks, newTask]);
                    setShowAddForm(false);
                });
        }
    };

    const handleShowForm = () => {
        setShowAddForm(!showAddForm);
        setEditTaskId(null); // Resetujemy ID zadania przy zamknięciu formularza
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
                        <td>{task.customStatus ? task.customStatus.name : "-"}</td>
                        <td>{task.category.name}</td>
                        <td>
                            <button className="edit-button" onClick={() => handleEdit(task)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(task)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={handleShowForm}>Add New Task</button>
            {showAddForm && (
                <div className="add-form">
                    <form onSubmit={handleAdd}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="title" style={{ display: 'block', marginBottom: '.5rem' }}>Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="description" style={{ display: 'block', marginBottom: '.5rem' }}>Description:</label>
                            <input
                                type="text"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="statusId" style={{ display: 'block', marginBottom: '.5rem' }}>Status ID:</label>
                            <input
                                type="number"
                                id="statusId"
                                value={statusId}
                                onChange={(e) => setStatusId(e.target.value)}
                                required
                                style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="categoryId" style={{ display: 'block', marginBottom: '.5rem' }}>CategoryId:</label>
                            <input
                                type="number"
                                id="categoryId"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                                required
                                style={{ width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                            />
                        </div>
                        <button onClick={handleShowForm} style={{
                            padding: '.5rem 1rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#007BFF',
                            color: '#fff'
                        }}>
                            Anuluj
                        </button>

                        <button type="submit" style={{
                            padding: '.5rem 1rem',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#007BFF',
                            color: '#fff'
                        }}>
                            {editTaskId ? 'Zapisz zmiany' : 'Zapisz'} {/* Zmieniamy tekst przycisku */}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
