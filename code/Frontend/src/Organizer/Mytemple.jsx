import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import Onavbar from './Onavbar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './organizer.css';

const Mytemple = () => {

  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {

      axios
        .get(`http://localhost:7000/organizer/gettemple/${user.id}`)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.error('Error fetching temples:', error);
        });

    }

  }, []);

  const deleteItem = async (id) => {

    try {

      await axios.delete(`http://localhost:7000/organizer/deletetemple/${id}`);

      alert("Temple Deleted Successfully");

      setItems(items.filter((item) => item._id !== id));

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>

      <Onavbar />

      <div className="container mx-auto p-8">

        <h2 className="text-3xl font-semibold mb-6 text-center">
          My Temple
        </h2>

        {/* Empty State */}
        {items.length === 0 && (

          <div
            className="bg-white shadow-lg rounded-lg p-10 text-center"
            style={{ maxWidth: "500px", margin: "auto" }}
          >

            <h4 className="text-xl mb-3">
              No Temple Created Yet
            </h4>

            <p className="text-gray-500 mb-4">
              Create your temple to start managing darshan bookings.
            </p>

            <Button
              onClick={() => navigate("/createtemple")}
              style={{ backgroundColor: "lightslategray", border: "none" }}
            >
              Create Temple Now
            </Button>

          </div>

        )}

        {/* Temple Cards */}
        <div className="max-w-md mx-auto grid grid-cols-1 gap-6">

          {items.map((item) => (

            <div key={item._id} className="bg-white p-4 rounded shadow relative">

              {/* Delete Button */}
              <button
                onClick={() => deleteItem(item._id)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "5px"
                }}
              >
                <FaTrash />
              </button>

              {/* Edit Button */}
              <div style={{ textAlign: "right", marginBottom: "10px" }}>
                <Link to={`/edittemple/${item._id}`}>
                  <Button
                    size="sm"
                    style={{ backgroundColor: "lightslategray", border: "none" }}
                  >
                    Edit Temple
                  </Button>
                </Link>
              </div>

              {/* Temple Image */}
              <img
                src={`http://localhost:7000/organizer/${item.templeImage}`}
                alt="Temple"
                className="w-full rounded-lg object-cover mb-4"
                style={{ height: "250px" }}
              />

              {/* Temple Name */}
              <p className="text-xl font-bold mb-2 text-center">
                {item.templeName}
              </p>

              <p className="text-center font-semibold">
                Timing
              </p>

              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p><strong>Open:</strong> {item.open}</p>
                <p><strong>Close:</strong> {item.close}</p>
              </div>

              <p>
                <strong>Location:</strong> {item.location}
              </p>

              <p>
                <strong>Description:</strong>
                {item.description.slice(0, 200)}...
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default Mytemple;