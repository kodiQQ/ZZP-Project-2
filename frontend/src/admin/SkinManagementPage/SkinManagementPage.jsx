
import { useState, useEffect } from 'react';
import SkinService from '../../axios/SkinService.js';
import './SkinManagementPage.css'

function SkinManagementPage() {
  const [skins, setSkins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [markedForDeletion, setMarkedForDeletion] = useState([]);
  const [skinToEdit, setSkinToEdit] = useState(null);
  // const [visible, setVisible] = useState(true);
  const [newSkin, setNewSkin] = useState({
    name: '',
    image: '',
    price: '',
    condition: 'FN',
    isStattrack: 'true',
    visible: 'true',
  });

  useEffect(() => {
    fetchSkins();
  }, []);

  const fetchSkins = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await SkinService.getAllSkins(token);
      // console.log(response);
      setSkins(response.productsList);
    } catch (error) {
      console.error('Error fetching skins:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (skinToEdit) {
      setSkinToEdit({
        ...skinToEdit,
        [name]: value,
      });
    } else {
      setNewSkin({
        ...newSkin,
        [name]: value,
      });
    }
  };

  const handleAddSkinSubmit = async (e) => {
    // console.log(newSkin)
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    try {
      await SkinService.addSkin(newSkin, token);
      fetchSkins();
      setShowForm(false);
      setNewSkin({
        name: '',
        image: '',
        price: '',
        visible: 'true',
      });
    } catch (error) {
      console.error('Error adding skin:', error);
    }
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setEditMode(false);
    setMarkedForDeletion([]);
    setSkinToEdit(null);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setDeleteMode(false);
    setMarkedForDeletion([]);
    setSkinToEdit(null);
  };

  const markForDeletion = (skinId) => {
    setMarkedForDeletion((prevMarked) =>
      prevMarked.includes(skinId)
        ? prevMarked.filter((id) => id !== skinId)
        : [...prevMarked, skinId]
    );
  };

  const confirmDeletion = async () => {
    const token = sessionStorage.getItem('token');
    try {
      await Promise.all(
        markedForDeletion.map(async (skinId) => {
          await SkinService.deleteSkin(skinId, token);
        })
      );
      setMarkedForDeletion([]);
      fetchSkins();
    } catch (error) {
      console.error('Error deleting skins:', error);
    }
  };

  const openEditForm = (skin) => {
    setSkinToEdit(skin);
  };

  const confirmEdit = async () => {
    const token = sessionStorage.getItem('token');
    console.log(skinToEdit);
    try {
      await SkinService.updateSkin(skinToEdit.id, skinToEdit, token);
      setSkinToEdit(null);
      fetchSkins();
    } catch (error) {
      console.error('Error updating skin:', error);
    }
  };

  return (
    <div className="user-management-container">
      <h2>Strona zarządzania skinami</h2>
      <button onClick={() => setShowForm(!showForm)} className="reg-button">
        Dodaj skin
      </button>
      <button onClick={toggleDeleteMode} className="delete-mode-button">
        {deleteMode ? 'Wyłącz tryb usuwania' : 'Włącz tryb usuwania'}
      </button>
      <button onClick={toggleEditMode} className="edit-mode-button">
        {editMode ? 'Wyłącz tryb edycji' : 'Włącz tryb edycji'}
      </button>

      {showForm && !editMode && (
        <form onSubmit={handleAddSkinSubmit} className="skin-form">
          <div>
            <label>Nazwa:</label>
            <input
              type="text"
              name="name"
              value={newSkin.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>URL Obrazu:</label>
            <input
              type="text"
              name="image"
              value={newSkin.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Stan:</label>
            <select
              name="condition"
              value={newSkin.condition}
              onChange={handleInputChange}
              required
            >
              <option value="FN">FN</option>
              <option value="MW">MW</option>
              <option value="FT">FT</option>
              <option value="WW">WW</option>
              <option value="BS">BS</option>
            </select>
          </div>
          <div>
            <label>Cena:</label>
            <input
              type="number"
              name="price"
              value={newSkin.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Stattrack?</label>
            <select
              name="isStattrack"
              value={newSkin.isStattrack}
              onChange={handleInputChange}
              required
            >
              <option value="true">Tak</option>
              <option value="false">Nie</option>
            </select>
          </div>

          <div>
            <label>Czy ktoś go wynajmuje?</label>
            <select
              name="rented"
              value={newSkin.rented}
              onChange={handleInputChange}
              required
            >
              <option value="true">Tak</option>
              <option value="false">Nie</option>
            </select>
          </div>
          <button type="submit">Dodaj</button>
        </form>
      )}

      <div className="grid-container">
        {Array.isArray(skins) && skins.length && skins.map((skin) => (
          <div
            key={skin.id}
            className={`square 
              ${deleteMode ? 'delete-mode-active' : ''}
              ${editMode ? 'edit-mode-active' : ''}
              ${markedForDeletion.includes(skin.id) ? 'marked' : ''}
              ${"true"==skin.rented ? 'not_visible' : ''}
              ${skinToEdit && skinToEdit.id === skin.id ? 'selected-for-edit' : ''}`
              
            
            }
              
            onClick={() => {
              if (deleteMode) markForDeletion(skin.id);
              if (editMode) openEditForm(skin);
            }}
          >
            <p style={{ color: deleteMode || editMode || "true"==skin.rented ? 'black' : 'white'}}>{skin.name} {"  "}{skin.isStattrack=="true" ?  <span style={{ color: 'orange' }}>{"ST  "} </span>:""}  {skin.condition}</p>
            <img
              src={`https://community.steamstatic.com/economy/image/${skin.image}`}
              alt={skin.name}
            />
            <span style={{color:"yellow"}}>{skin.floatt ? "Float:" : ""} {skin.floatt}</span>
            <p style={{ color: deleteMode || editMode || "true"==skin.rented  ? 'black' : 'white'}}>{skin.price} zł</p>
          </div>
        ))}
      </div>

      {deleteMode && markedForDeletion.length > 0 && (
        <button onClick={confirmDeletion} className="confirm-button">
          Zatwierdź usunięcie
        </button>
      )}

      {editMode && skinToEdit && (
        // <form onSubmit={(e) => { e.preventDefault(); confirmEdit(); }} className="skin-form">
        //   <div>
        //     <label>Nazwa:</label>
        //     <input
        //       type="text"
        //       name="name"
        //       value={skinToEdit.name}
        //       onChange={handleInputChange}
        //       required
        //     />
        //   </div>
        //   <div>
        //     <label>URL Obrazu:</label>
        //     <input
        //       type="text"
        //       name="image"
        //       value={skinToEdit.image}
        //       onChange={handleInputChange}
        //       required
        //     />
        //   </div>
        //   <div>
        //     <label>Cena:</label>
        //     <input
        //       type="number"
        //       name="price"
        //       value={skinToEdit.price}
        //       onChange={handleInputChange}
        //       required
        //     />
        //   </div>
        //   <div>
        //     <label>Widoczny:</label>
        //     <select
        //       name="visible"
        //       value={skinToEdit.visible}
        //       onChange={handleInputChange}
        //       required
        //     >
        //       <option value="true">Tak</option>
        //       <option value="false">Nie</option>
        //     </select>
        //   </div>
        //   <button onClick={confirmEdit} type="submit">Zatwierdź</button>
        // </form>

        <form onSubmit={(e) => { e.preventDefault(); confirmEdit(); }} className="skin-form">
           <div>
             <label>Nazwa:</label>
             <input
              type="text"
              name="name"
              value={skinToEdit.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>URL Obrazu:</label>
            <input
              type="text"
              name="image"
              value={skinToEdit.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Stan:</label>
            <select
              name="condition"
              value={skinToEdit.condition}
              onChange={handleInputChange}
              required
            >
              <option value="FN">FN</option>
              <option value="MW">MW</option>
              <option value="FT">FT</option>
              <option value="WW">WW</option>
              <option value="BS">BS</option>
            </select>
          </div>
          <div>
            <label>Cena:</label>
            <input
              type="number"
              name="price"
              value={skinToEdit.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label>Stattrack?</label>
            <select
              name="isStattrack"
              value={skinToEdit.isStattrack}
              onChange={handleInputChange}
              required
            >
              <option value="true">Tak</option>
              <option value="false">Nie</option>
            </select>
          </div>

          <div>
            <label>Czy ktoś go wynajmuje?</label>
            <select
              name="rented"
              value={skinToEdit.rented}
              onChange={handleInputChange}
              required
            >
              <option value="true">Tak</option>
              <option value="false">Nie</option>
            </select>
          </div>
          <div>
            <label>{"Data końca najmu (o ile taki jest)"}</label>
            <input
              type="text"
              name="tradeability"
              value={skinToEdit.tradeability}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Dodaj</button>
        </form>
      )}
    </div>
  );
}

export default SkinManagementPage;
