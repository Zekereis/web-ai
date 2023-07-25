import React, { useState } from "react";
import axios from "axios";

const AddSiteForm = () => {
  const [siteData, setSiteData] = useState({
    name: "",
    url: "",
    description: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSiteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/addSite", siteData)
      .then((response) => {
        console.log(response.data.message);
        // Formu sıfırla veya başka bir işlem yap
      })
      .catch((error) => {
        console.error("Veri ekleme hatası:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={siteData.name} onChange={handleChange} placeholder="Site Adı" />
      <input type="text" name="url" value={siteData.url} onChange={handleChange} placeholder="Site URL" />
      <textarea name="description" value={siteData.description} onChange={handleChange} placeholder="Açıklama"></textarea>
      <input type="text" name="category" value={siteData.category} onChange={handleChange} placeholder="Kategori" />
      <button type="submit">Ekle</button>
    </form>
  );
};

export default AddSiteForm;
