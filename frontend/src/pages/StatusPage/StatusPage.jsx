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
    const [name, setName] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editStatusId, setEditStatusId] = useState(null); // Dodano stan na edytowane zadanie




    const handleShowForm = () => {
        setShowAddForm(!showAddForm);
        setEditStatusId(null); // Resetujemy ID zadania przy zamknięciu formularza
    };

    const handleEdit = (status) => {
        let id=status.id;

        setName(status.name);
        setEditStatusId(id); // Ustawiamy ID edytowanego zadania
        setShowAddForm(true); // Pokazujemy formularz

    };

    const handleDelete = (id) => {
        console.log("Status id");
        userService.deleteStatus(sessionStorage.getItem("token"),id);
        location.reload();
    };

    const handleAdd = () => {
        // e.preventDefault();
        console.log("handleAdd");
        if (editStatusId) {
            console.log("1111111");
            // Jeśli edytujemy, wywołujemy aktualizację zadania
            userService.updateStatus(sessionStorage.getItem("token"), editStatusId, name)
                .then(() => {
                    // setStatuses(statuss.map(status => status.id === editStatusId ? { ...status, title, description, statusId, categoryId } : status));
                    setEditStatusId(null);
                    setShowAddForm(false);
                });
        } else {
            console.log("222222");
            // Jeśli dodajemy, wywołujemy metodę dodawania zadania
            userService.addStatus(sessionStorage.getItem("token"), name)
                .then(() => {
                    // setStatuses([...statuss, newStatus]);
                    setShowAddForm(false);
                });
        }
    };

    return (
        <div className="status-table-container">
            <h1>Status Table</h1>
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
                            <button className="edit-button" onClick={() => handleEdit(status)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(status.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={handleShowForm}>Add New Status</button>
            {showAddForm && (
                <div className="add-form">
                    <form onSubmit={handleAdd}>

                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="name" style={{ display: 'block', marginBottom: '.5rem' }}>Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                            {editStatusId ? 'Zapisz zmiany' : 'Zapisz'} {/* Zmieniamy tekst przycisku */}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default StatusPage;