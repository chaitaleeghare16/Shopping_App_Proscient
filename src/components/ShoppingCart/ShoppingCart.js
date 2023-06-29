import React, { useState } from 'react';
import './ShoppingCart.css';
import AddItemForm from '../AddItemForm/AddItemForm';


const ShoppingCart = () => {

  const [itemsList, setItemsList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [inputFields, setInputFields] = useState({ itemName: '', itemPrice: '' })
  const [errors, setErrors] = useState({ itemName: '', itemPrice: '' });
  const [isEditMode, setIsEditMode] = useState(false)
  const [editIndex, setEditIndex] = useState();


  const addItem = (newItem) => {
    if (isEditMode) {
      const updatedItems = [...itemsList]
      updatedItems[editIndex] = newItem
      setItemsList(updatedItems)
      setIsEditMode(false)
    } else {
      const updatedItems = [...itemsList, newItem];
      setItemsList(updatedItems);
    }


  }

  const editItem = (index) => {
    setIsEditMode(true)
    setEditIndex(index)
    const itemsToEdit = itemsList[index]
    setInputFields({ ...inputFields, itemName: itemsToEdit.name, itemPrice: itemsToEdit.price })
    setShowForm(true)
  }

  const removeItem = (index) => {
    const updatedItems = [...itemsList];
    updatedItems.splice(index, 1);
    setItemsList(updatedItems);
  };

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };


  return (
    <div className="shopping-cart container">

      <h2>Shopping Cart</h2>

      <button className="add-item-btn" onClick={handleFormToggle}>
        {showForm ? 'Close Form' : 'Add Item'}
      </button>
      {showForm && <AddItemForm
        inputFields={inputFields}
        setInputFields={(name, value) => {
          setInputFields((inputFields) => ({ ...inputFields, [name]: value }))
        }}


        isEditMode={isEditMode}
        list_items={(newItem) => {

          addItem(newItem)
        }}
        errors={errors}
        setErrors={(error) => {
          setErrors(error)
        }}

      />
      }
      {

        itemsList?.length === 0 ? (<p className="empty-message">No items in the cart</p>) :

          <ul className="item-list">
            <li>Items List</li>
            <li className="cart-item">
              <span>Sr No.</span>
              <span>name</span>
              <span>price</span>
              <span>Action </span>
            </li>

            {itemsList && itemsList.map((item, index) => (

              <li key={index} className="cart-item">
                <span>{index + 1}</span>

                <span className='item-name'>{item?.name}</span>

                <span>{item?.price.toFixed(2)}</span>
                <span>
                  <button className="edit-btn" onClick={() => editItem(index)}>
                    Edit
                  </button>
                  <button className="remove-btn" onClick={() => removeItem(index)}>
                    Remove
                  </button>


                </span>
              </li>
            ))}
          </ul>

      }
    </div>
  );
};


export default ShoppingCart;
