import React, { useState } from "react";
import axios from "axios";
import Onavbar from "./Onavbar";
import { useNavigate } from "react-router-dom";

function CreateTemple() {

  const navigate = useNavigate();

  const [templeName, setTempleName] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [description, setDescription] = useState("");
  const [templeImage, setTempleImage] = useState(null);

  const handleSubmit = async (e) => {

  e.preventDefault();

  const userData = localStorage.getItem("user");
  const user = userData && userData !== 'undefined' ? JSON.parse(userData) : null;

  if (!user) {
    alert('User not logged in');
    return;
  }

  try {

    const formData = new FormData();
    formData.append('organizerId', user.id);
    formData.append('templeName', templeName);
    formData.append('location', location);
    formData.append('open', open);
    formData.append('close', close);
    formData.append('description', description);
    if (templeImage) {
      formData.append('templeImage', templeImage);
    }

    await axios.post("http://localhost:7000/organizer/createtemple", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    alert("Temple Created Successfully");

    navigate("/mytemple");

  } catch (error) {

    console.log(error);

    alert("Temple creation failed");

  }

};
  return (

    <div className="bg-gray-100 min-h-screen">

      <Onavbar />

      <div className="flex justify-center items-center py-10">

        <div className="bg-white shadow-xl rounded-xl p-8 w-[420px]">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Temple
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm font-semibold">Temple Name</label>
              <input
                type="text"
                value={templeName}
                onChange={(e) => setTempleName(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Enter temple name"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
                placeholder="Enter location"
                required
              />
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="text-sm font-semibold">Open Time</label>
                <input
                  type="text"
                  value={open}
                  onChange={(e) => setOpen(e.target.value)}
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="6:00 AM"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="text-sm font-semibold">Close Time</label>
                <input
                  type="text"
                  value={close}
                  onChange={(e) => setClose(e.target.value)}
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="9:00 PM"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1"
                rows="3"
                placeholder="Temple description"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Temple Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setTempleImage(e.target.files[0])}
                className="w-full border rounded-lg p-2 mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-700 transition"
            >
              Create Temple
            </button>

          </form>

        </div>

      </div>

    </div>

  );
}

export default CreateTemple;