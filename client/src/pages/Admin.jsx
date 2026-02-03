import { useState, useEffect } from 'react';

function Admin() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', techStack: '', githubLink: ''
  });
  
  // State baru: Untuk tahu kita tengah mode "Edit" atau "Baru"
  const [editId, setEditId] = useState(null); 

  // URL Backend (Pastikan URL ni betul)
  const API_URL = 'https://mernproject-fvy9.onrender.com/api/projects';

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // LOGIC BARU: Kalau ada editId, kita UPDATE. Kalau tak ada, kita CREATE.
    if (editId) {
      // --- MODE UPDATE ---
      try {
        const res = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (res.ok) {
            setFormData({ title: '', description: '', techStack: '', githubLink: '' });
            setEditId(null); // Reset balik jadi mode "Tambah"
            fetchProjects();
            alert("Projek berjaya di-update!");
        }
      } catch (err) { console.error("Error updating:", err); }

    } else {
      // --- MODE TAMBAH BARU ---
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setFormData({ title: '', description: '', techStack: '', githubLink: '' });
        fetchProjects();
      } catch (err) { console.error("Error creating:", err); }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Adakah anda pasti nak buang projek ini?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch (err) { console.error("Error deleting:", err); }
  };

  // FUNGSI EDIT: Ambil data projek, masukkan dalam borang
  const handleEdit = (project) => {
    setEditId(project._id); // Set ID untuk tahu kita tengah edit siapa
    setFormData({
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        githubLink: project.githubLink
    });
    // Scroll ke atas supaya user nampak borang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FUNGSI BATAL EDIT (Optional)
  const cancelEdit = () => {
      setEditId(null);
      setFormData({ title: '', description: '', techStack: '', githubLink: '' });
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>💻 Portfolio Manager</h1>

      {/* BORANG */}
      <div style={{ background: editId ? "#fff3cd" : "#f4f4f4", padding: "20px", borderRadius: "8px", marginBottom: "20px", border: editId ? "2px solid orange" : "none" }}>
        <h3>{editId ? "✏️ Edit Projek" : "➕ Tambah Projek Baru"}</h3>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input name="title" placeholder="Nama Projek" value={formData.title} onChange={handleChange} required style={{ padding: "8px" }} />
          <textarea name="description" placeholder="Keterangan" value={formData.description} onChange={handleChange} required style={{ padding: "8px" }} />
          <input name="techStack" placeholder="Tech Stack" value={formData.techStack} onChange={handleChange} style={{ padding: "8px" }} />
          <input name="githubLink" placeholder="Link GitHub" value={formData.githubLink} onChange={handleChange} style={{ padding: "8px" }} />
          
          <div style={{ display: 'flex', gap: '10px'}}>
            <button type="submit" style={{ flex: 1, padding: "10px", background: editId ? "orange" : "blue", color: "white", border: "none", cursor: "pointer" }}>
                {editId ? "Update Projek" : "Simpan Projek"}
            </button>
            {editId && (
                <button type="button" onClick={cancelEdit} style={{ padding: "10px", background: "gray", color: "white", border: "none", cursor: "pointer" }}>
                    Batal
                </button>
            )}
          </div>
        </form>
      </div>

      {/* SENARAI */}
      <div>
        <h3>Senarai Projek:</h3>
        {projects.map((project) => (
          <div key={project._id} style={{ border: "1px solid #ddd", padding: "15px", marginBottom: "10px", borderRadius: "5px", background: "white" }}>
            <h2 style={{ margin: "0 0 10px 0" }}>{project.title}</h2>
            <p>{project.description}</p>
            <p style={{ color: "gray", fontSize: "0.9em" }}>🛠 {project.techStack}</p>
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ marginRight: "15px" }}>Lihat di GitHub</a>}
            
            <div style={{ marginTop: "10px" }}>
                <button 
                onClick={() => handleDelete(project._id)} 
                style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px", marginRight: "10px" }}
                >
                Padam
                </button>
                {/* Kita pass 'project' object terus, bukan ID saja */}
                <button 
                onClick={() => handleEdit(project)} 
                style={{ background: "#4CAF50", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}
                >
                Edit
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;