import React from 'react';
import './AddItemForm.css'; // Import CSS file for styling

const AddItemForm = ({inputFields,setInputFields,isEditMode, list_items,errors,setErrors}) => {
 
  const handleAddItem = (e) => {
   e.preventDefault();
  handleValidation();
    
    if (inputFields.itemName && inputFields.itemPrice) {
      const newItem = {
        name: inputFields.itemName,
        price: parseFloat(inputFields.itemPrice)
      };
      list_items(newItem);
      setInputFields('itemName','');   
      setInputFields('itemPrice','');    


    }
  };

  const handleValidation = () => {
    
    setErrors({...errors,itemName:'',itemPrice:''});
   
    if (inputFields?.itemName?.length === 0 || inputFields?.itemPrice?.length === 0  ) {
      setErrors({...errors,itemName:'Please enter name',itemPrice:'Please enter valid price'}); 
    }

  };
  
  const handleChange =(e) =>{
  
  const {name,value} = e.target

 
  if(name === "itemName" && value.length > 120){
    setErrors({...errors,itemName:'Max length is 200 characters'})
  }
  else if(name === "itemPrice" && isNaN(value)){
    setErrors({...errors,itemPrice:'Price should be number'})
  }
  else if(value.length === 0){
    setErrors({...errors,itemName:'Please enter name',itemPrice:'Please enter valid price'})
  }
  else{
    setErrors({...errors,itemName:'',itemPrice:''})

  }
  setInputFields(name,value)

  }


  return (
    <div className="add-item-form">
      <form onSubmit={handleAddItem}>
      <h2>Add Item Form Here....</h2>
      <input
        type="text"
        name="itemName"
        placeholder="Item Name"
        value={inputFields?.itemName}
        onChange={handleChange}
      />
      {errors.itemName && <span className="error">{errors.itemName}</span>}
      <input
        type="text"
        name="itemPrice"
        placeholder="Item Price"
        value={inputFields.itemPrice}
        onChange={handleChange}
      />
       {errors.itemPrice && <span className="error">{errors.itemPrice}</span>}
      <button type="submit">{isEditMode?'Edit' :'Add'}</button>
      </form>
    </div>
  );
};

export default AddItemForm;
