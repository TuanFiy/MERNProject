const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // Import model tadi

// @route   POST /api/projects
// @desc    Tambah projek baru
router.post('/', async (req, res) => {
    console.log("DEBUG PROJECT MODEL:", Project); // <--- Tambah baris ini
    try {
        // 1. Ambil data dari body (apa yang user hantar)
        const { title, description, techStack, githubLink } = req.body;

        // 2. Buat object projek baru
        const newProject = new Project({
            title,
            description,
            techStack,
            githubLink
        });

        // 3. Simpan ke database (Async/Await sangat penting sini!)
        const savedProject = await newProject.save();

        // 4. Bagi respon berjaya
        res.json(savedProject);
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const projects = await Project.find(); // .find() ni arahan cari SEMUA data
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Project.findByIdAndDelete(req.params.id);
        
        if (!result) {
            return res.status(404).json({ message: "Projek tak jumpa!" });
        }

        res.json({ message: "Projek berjaya dibuang" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.edit('/:id', async (req, res) => {
    try {
        const result = await Project.findByIdAndUpdate(req.params.id, req.body);
        
        if (!result) {
            return res.status(404).json({ message: "Projek tak jumpa!" });
        }

        res.json({ message: "Projek berjaya diedit" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;