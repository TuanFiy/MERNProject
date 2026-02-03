import { useState, useEffect } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', githubLink: ''
  });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = () => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setFormData({ title: '', description: '', techStack: '', githubLink: '' });
      fetchProjects();
    } catch (err) { console.error(err); }
  };

  // === FUNGSI BARU: DELETE ===
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Adakah anda pasti nak buang projek ini?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
      });
      // Refresh list lepas delete
      fetchProjects();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>💻 Portfolio Manager</h1>

      {/* BORANG TAMBAH PROJEK */}
      <div style={{ background: "#f4f4f4", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>➕ Tambah Projek Baru</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input name="title" placeholder="Nama Projek" value={formData.title} onChange={handleChange} required style={{ padding: "8px" }} />
          <textarea name="description" placeholder="Keterangan" value={formData.description} onChange={handleChange} required style={{ padding: "8px" }} />
          <input name="techStack" placeholder="Tech Stack" value={formData.techStack} onChange={handleChange} style={{ padding: "8px" }} />
          <input name="githubLink" placeholder="Link GitHub" value={formData.githubLink} onChange={handleChange} style={{ padding: "8px" }} />
          <button type="submit" style={{ padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>Simpan Projek</button>
        </form>
      </div>

      {/* SENARAI PROJEK */}
      <div>
        <h3>Senarai Projek:</h3>
        {projects.map((project) => (
          <div key={project._id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "10px", borderRadius: "5px", position: "relative" }}>
            <h2 style={{ margin: "0 0 10px 0" }}>{project.title}</h2>
            <p>{project.description}</p>
            <p style={{ color: "gray", fontSize: "0.9em" }}>🛠 {project.techStack}</p>
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ marginRight: "15px" }}>Lihat di GitHub</a>}
            
            {/* TOMBOL DELETE */}
            <button 
              onClick={() => handleDelete(project._id)} 
              style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
            >
              Padam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;