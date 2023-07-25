import React, { useState, useEffect } from "react";
import axios from "axios";
import SiteFrame from "./SiteFrame";
import "../App.css";
import CategoryDropdown from "./CategoryDropDown";
import AddSiteForm from "./AddSiteForm";

const Json = () => {
  const [sites, setSites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Kategorileri al
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getJsonData");
        const jsonData = response.data;
        const uniqueCategories = [...new Set(jsonData.sites.map((site) => site.category))];
        setSites(jsonData.sites);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("JSON veri çekme hatası:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Kategoriye göre siteleri filtrele
    if (selectedCategory === "") {
      setSites(sites);
    } else {
      const filteredSites = sites.filter((site) => site.category === selectedCategory);
      setSites(filteredSites);
    }
  }, [selectedCategory, sites]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1>Yapay Zeka Siteleri</h1>
      <CategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="site-frame-container">
        {sites.map((site, index) => (
          <SiteFrame key={index} site={site} />
        ))}
      </div>
      <AddSiteForm />
    </div>
  );
};

export default Json;
