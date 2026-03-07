import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Onavbar from "./Onavbar";
import moment from "moment";
import "moment-timezone";

function CreatedDarshan() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    darshanName: "",
    open: "",
    close: "",
    prices: {
      normal: "",
      vip: "",
    },
  });

  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData && userData !== 'undefined' ? JSON.parse(userData) : null;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData && userData !== 'undefined' ? JSON.parse(userData) : null;

    if (user) {
      axios
        .get(`http://localhost:7000/organizer/gettemple/${user.id}`)
        .then((response) => {
          setItems(response.data);
        })
        .catch((error) => {
          console.error("Error fetching temples:", error);
        });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("prices")) {
      const priceType = name.split(".")[1];

      setFormData({
        ...formData,
        prices: {
          ...formData.prices,
          [priceType]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('User not logged in');
      return;
    }

    try {
      const formDataToSend = {
        ...formData,
        organizerName: user.name,
        organizerId: user.id,
        templeName: items[0]?.templeName,
        location: items[0]?.location,
        templeImage: items[0]?.templeImage,
      };

      formDataToSend.open = moment
        .tz(formData.open, "HH:mm", "Asia/Kolkata")
        .format("hh:mm A");

      formDataToSend.close = moment
        .tz(formData.close, "HH:mm", "Asia/Kolkata")
        .format("hh:mm A");

      await axios.post(
        "http://localhost:7000/organizer/createdarshan",
        formDataToSend
      );

      alert("Darshan added successfully");
      navigate("/odarshans");
    } catch (error) {
      console.error("Error adding darshan:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Onavbar />

      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
            Create Darshan
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Darshan Name</label>
              <input
                type="text"
                name="darshanName"
                value={formData.darshanName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Enter Darshan Name"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-center">
                Timing
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Open</label>
                  <input
                    type="time"
                    name="open"
                    value={formData.open}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm">Close</label>
                  <input
                    type="time"
                    name="close"
                    value={formData.close}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2 text-center">
                Prices
              </label>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Normal Price</label>
                  <input
                    type="text"
                    name="prices.normal"
                    value={formData.prices.normal}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="Normal Price"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm">VIP Price</label>
                  <input
                    type="text"
                    name="prices.vip"
                    value={formData.prices.vip}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="VIP Price"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
                placeholder="Enter description"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Create Darshan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatedDarshan;