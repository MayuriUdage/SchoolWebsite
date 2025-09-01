import axios from "axios";
import { useEffect, useState } from "react";
import "../css/ShowSchools.css";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    const res = await axios.get("http://localhost:5000/api/schools");
    setSchools(res.data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this school?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/schools/${id}`);
      fetchSchools(); 
    } catch (error) {
      console.error(error);
      alert("Error deleting school");
    }
  };

  const handleView = (school) => {
    alert(`School: ${school.name}\nAddress: ${school.address}, ${school.city}, ${school.state}\nContact: ${school.contact}\nEmail: ${school.email_id}`);
  };

  return (
    <div className="schools-container">
      <h2>Schools List</h2>
      <div className="cards-grid">
        {schools.map((school) => (
          <div className="card" key={school.id}>
            <img
              src={`http://localhost:5000/schoolImages/${school.image}`}
              alt={school.name}
              className="card-img"
            />
            <div className="card-body">
              <h3>{school.name}</h3>
              <p>{school.address}, {school.city}, {school.state}</p>
              <p className="contact">📞 {school.contact}</p>
              <p className="email">✉️ {school.email_id}</p>
            </div>
            <div className="card-footer">
              <button onClick={() => handleView(school)}>View</button>
              <button onClick={() => handleDelete(school.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
