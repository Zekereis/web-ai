const express = require("express");
const cors = require("cors"); // cors modülünü require edin
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors()); // CORS politikasını aç

// Diğer kodlarınızı burada devam ettirin...



app.use(express.json());

const dataPath = path.join(__dirname, "data", "ai.json");

// JSON dosyasındaki verileri okuma
function readData() {
  const jsonData = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(jsonData);
}

// JSON dosyasına veri ekleme
function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
}
app.get("/getJsonData", (req, res) => {
  try {
    const jsonData = readData();
    res.status(200).json(jsonData);
  } catch (error) {
    console.error("JSON veri çekme hatası:", error);
    res.status(500).json({ error: "JSON veri çekme hatası" });
  }
});

// Veri ekleme endpoint'i
app.post("/addSite", (req, res) => {
  const { name, url, description, category } = req.body;

  // Yeni site verisi
  const newSite = {
    name,
    url,
    description,
    category,
  };

  // Mevcut verileri al
  const data = readData();

  // Yeni siteyi verilere ekle
  data.sites.push(newSite);

  // Verileri güncelle
  writeData(data);

  res.status(200).json({ message: "Site başarıyla eklendi!" });
});

// Sunucuyu başlatma
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
