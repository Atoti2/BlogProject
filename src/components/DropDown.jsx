import React from 'react';

const DropDown = ({ setCategory, categories, category }) => {

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory); 
  };

  return (
    <select 
      className="select select-bordered w-full mb-5" 
      value={category || ""}
      onChange={handleChange}
    >
      <option disabled value="">Select category</option>
      {categories?.length > 0 && categories.map((categ) => (
        <option key={categ.name} value={categ.name}>{categ.name}</option>
      ))}
    </select>
  );
};

export default DropDown;
