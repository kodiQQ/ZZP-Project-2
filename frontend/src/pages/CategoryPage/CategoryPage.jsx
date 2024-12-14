// import React, {useEffect, useState} from 'react';
// import "./CategoryPage.css"
// import userService from "../../axios/UserService.js";
// function CategoryPage(){
//
//     const fetchCategories = async () => {
//         try {
//             const response = await userService.getCategories(sessionStorage.getItem("token"));
//
//             setCategories(response);
//         } catch (error) {
//             console.error('Error fetching skins:', error);
//         }
//     };
//     useEffect(() => {
//         fetchCategories();
//     }, []);
//
//     const [categories, setCategories] = useState([]);
//
//     const handleEdit = (id) => {
//         alert(`Edit category with ID: ${id}`);
//         // Add your edit logic here
//     };
//
//     const handleDelete = (id) => {
//         setCategories(categories.filter(category => category.id !== id));
//     };
//
//     const handleAdd = () => {
//         const newCategory = {
//             id: Date.now(),
//             title: "Nowy tytul",
//             description: "Nowy opis",
//             category: "NEW",
//             customCategory: null,
//             category: { id: 7, name: "zadania" },
//         };
//         setCategories([...categories, newCategory]);
//     };
//
//     return (
//         <div className="category-table-container">
//             <h1>Task Table</h1>
//             <table className="category-table">
//                 <thead>
//                 <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     <th>Actions</th>
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {categories.map(category => (
//                     <tr key={category.id}>
//                         <td>{category.id}</td>
//                         <td>{category.name}</td>
//                         <td>
//                             <button className="edit-button" onClick={() => handleEdit(category.id)}>Edit</button>
//                             <button className="delete-button" onClick={() => handleDelete(category.id)}>Delete</button>
//                         </td>
//                     </tr>
//                 ))}
//                 </tbody>
//             </table>
//             <button className="add-button" onClick={handleAdd}>Add New Task</button>
//         </div>
//     );
// };
//
// export default CategoryPage;


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
    const [name, setName] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null); // Dodano stan na edytowane zadanie




    const handleShowForm = () => {
        setShowAddForm(!showAddForm);
        setEditCategoryId(null); // Resetujemy ID zadania przy zamknięciu formularza
    };

    const handleEdit = (category) => {
        let id=category.id;

        setName(category.name);
        setEditCategoryId(id); // Ustawiamy ID edytowanego zadania
        setShowAddForm(true); // Pokazujemy formularz

    };

    const handleDelete = (id) => {
        console.log("Category id");
        userService.deleteCategory(sessionStorage.getItem("token"),id);
        location.reload();
    };

    const handleAdd = () => {
        // e.preventDefault();
        console.log("handleAdd");
        if (editCategoryId) {
            console.log("1111111");
            // Jeśli edytujemy, wywołujemy aktualizację zadania
            userService.updateCategory(sessionStorage.getItem("token"), editCategoryId, name)
                .then(() => {
                    // setCategories(categorys.map(category => category.id === editCategoryId ? { ...category, title, description, categoryId, categoryId } : category));
                    setEditCategoryId(null);
                    setShowAddForm(false);
                });
        } else {
            console.log("222222");
            // Jeśli dodajemy, wywołujemy metodę dodawania zadania
            userService.addCategory(sessionStorage.getItem("token"), name)
                .then(() => {
                    // setCategories([...categorys, newCategory]);
                    setShowAddForm(false);
                });
        }
    };

    return (
        <div className="category-table-container">
            <h1>Category Table</h1>
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
                            <button className="edit-button" onClick={() => handleEdit(category)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(category.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="add-button" onClick={handleShowForm}>Add New Category</button>
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
                            {editCategoryId ? 'Zapisz zmiany' : 'Zapisz'} {/* Zmieniamy tekst przycisku */}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;