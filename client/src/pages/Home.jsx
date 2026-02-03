import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [projects, setProjects] = useState([]);

  // Ganti dengan URL Render awak
  const API_URL = 'https://mernproject-fvy9.onrender.com/api/projects';

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "#333" }}>
      
      {/* --- NAVBAR --- */}
      <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px 50px", alignItems: "center" }}>
        <h2 style={{ fontWeight: "800", fontSize: "24px" }}>MyPortfolio.</h2>
        <div>
          <a href="#about" style={navLinkStyle}>About</a>
          <a href="#projects" style={navLinkStyle}>Projects</a>
          <Link to="/admin" style={{...navLinkStyle, color: "blue"}}>Admin Login</Link>
        </div>
      </nav>

      {/* --- HERO SECTION (Ikut Figma: Kiri Teks, Kanan Gambar) --- */}
      <header style={{ display: "flex", alignItems: "center", padding: "50px 50px", minHeight: "60vh" }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#FD5956", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px" }}>Software Engineer</p>
          <h1 style={{ fontSize: "60px", lineHeight: "1.2", margin: "20px 0" }}>
            Hello, I'm <br/>
            <span style={{ color: "#FD5956" }}>Hafiq.</span>
          </h1>
          <p style={{ color: "#666", fontSize: "18px", maxWidth: "450px", lineHeight: "1.6" }}>
            I build interactive websites and comprehensive backend systems. Currently focused on MERN Stack development.
          </p>
          <button style={btnStyle}>Contact Me</button>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
            {/* Ganti src dengan gambar awak sendiri nanti */}
            <div style={{ width: "350px", height: "350px", background: "#f0f0f0", borderRadius: "50%", overflow: "hidden", border: "5px solid #fff", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
                <img src="https://via.placeholder.com/400" alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
        </div>
      </header>

      {/* --- PROJECTS SECTION (Dynamic Data) --- */}
      <section id="projects" style={{ padding: "50px 50px", background: "#FAFAFA" }}>
        <h2 style={{ fontSize: "36px", marginBottom: "40px" }}>Featured Projects</h2>
        
        {/* Grid Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px" }}>
          {projects.length === 0 ? <p>Loading projects...</p> : projects.map((project) => (
            <div key={project._id} style={cardStyle}>
              <div style={{ height: "200px", background: "#ddd", borderRadius: "10px 10px 0 0", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
                Project Preview
              </div>
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "22px", margin: "0 0 10px 0" }}>{project.title}</h3>
                <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.5", marginBottom: "15px" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <span style={{ background: "#eee", padding: "5px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                     {project.techStack || "Tech"}
                   </span>
                   {project.githubLink && (
                     <a href={project.githubLink} target="_blank" rel="noreferrer" style={{ color: "#FD5956", fontWeight: "bold", textDecoration: "none" }}>
                       View Code →
                     </a>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

// --- Styles (Inline CSS untuk cepat) ---
const navLinkStyle = { margin: "0 15px", textDecoration: "none", color: "#333", fontWeight: "500" };
const btnStyle = { marginTop: "20px", padding: "12px 30px", background: "#FD5956", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" };
const cardStyle = { background: "white", borderRadius: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", transition: "transform 0.3s ease" };

export default Home;