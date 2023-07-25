import React from "react";

const CategoryDropdown = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div>
      <label htmlFor="category">Kategori Seç:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">Tüm Kategoriler</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
