import React, {useEffect, useState} from 'react';
import "./CategoryPage.css"
import userService from "../../axios/UserService.js";
function CategoryPage(){

    const fetchCategories = async () => {
        try {
            const response = await userService.getCategories(sessionStorage.getItem("token"));

            setCategories(response);
        } catch (error) {
            console.error('Error fetching skins:', error);
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    const [categories, setCategories] = useState([]);

    const handleEdit = (id) => {
        alert(`Edit category with ID: ${id}`);
        // Add your edit logic here
    };

    const handleDelete = (id) => {
        setCategories(categories.filter(category => category.id !== id));
    };

    const handleAdd = () => {
        const newCategory = {
            id: Date.now(),
            title: "Nowy tytul",
            description: "Nowy opis",
            status: "NEW",
            customStatus: null,
            category: { id: 7, name: "zadania" },
        };
        setCategories([...categories, newCategory]);
    };

    return (
        <div className="category-table-container">
            <h1>Task Table</h1>
            <table className="category-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {categories.map(category => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            <button className="edit-button" onClick={() => handleEdit(category.id)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(category.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={handleAdd}>Add New Task</button>
        </div>
    );
};

export default CategoryPage;