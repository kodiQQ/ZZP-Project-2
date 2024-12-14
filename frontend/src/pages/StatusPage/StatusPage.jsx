import React, {useEffect, useState} from 'react';
import "./StatusPage.css"
import userService from "../../axios/UserService.js";
function StatusPage(){

    const fetchStatuses = async () => {
        try {
            const response = await userService.getStatuses(sessionStorage.getItem("token"));

            setStatuses(response);
        } catch (error) {
            console.error('Error fetching skins:', error);
        }
    };
    useEffect(() => {
        fetchStatuses();
    }, []);

    const [statuses, setStatuses] = useState([]);

    const handleEdit = (id) => {
        alert(`Edit status with ID: ${id}`);
        // Add your edit logic here
    };

    const handleDelete = (id) => {
        setStatuses(statuses.filter(status => status.id !== id));
    };

    const handleAdd = () => {
        const newStatus = {
            id: Date.now(),
            title: "Nowy tytul",
            description: "Nowy opis",
            status: "NEW",
            customStatus: null,
            status: { id: 7, name: "zadania" },
        };
        setStatuses([...statuses, newStatus]);
    };

    return (
        <div className="status-table-container">
            <h1>Task Table</h1>
            <table className="status-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {statuses.map(status => (
                    <tr key={status.id}>
                        <td>{status.id}</td>
                        <td>{status.name}</td>
                        <td>
                            <button className="edit-button" onClick={() => handleEdit(status.id)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(status.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={handleAdd}>Add New Task</button>
        </div>
    );
};

export default StatusPage;