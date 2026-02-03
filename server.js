require('dotenv').config();
const dotenv = require('dotenv');
const result = dotenv.config(); // Simpan result config dalam variable
// Debugging: Kita check adakah dotenv berjaya load?
if (result.error) {
  console.log("❌ Error loading .env file:", result.error);
}

console.log("DEBUG URI:", process.env.MONGO_URI); // Kita tengok apa dia print

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Sambung ke MongoDB (Pastikan check dulu kalau URI wujud)
if (!process.env.MONGO_URI) {
    console.log("❌ FATAL ERROR: MONGO_URI tak jumpa. Check fail .env awak!");
    process.exit(1); // Matikan server terus kalau tak ada DB
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected!'))
    .catch((err) => console.log('❌ DB Error:', err));
app.get('/', (req, res) => {
    res.send('API Connected to Database!');
});

const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});