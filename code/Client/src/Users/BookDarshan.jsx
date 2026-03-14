import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Unavbar from './Unavbar';
import './user.css'

function BookDarshan() {
  const [item, setItem] = useState({});
  const [selectedDarshan, setSelectedDarshan] = useState('normal');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phno: '',
  });
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity(quantity + 1);
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:7000/user/darshan/${id}`)
      .then((resp) => {
        console.log('API Response:', resp.data);
        if (!resp.data) {
          console.error('No darshan data received');
          alert('Darshan not found');
          navigate('/utemples');
          return;
        }
        setItem(resp.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Failed to fetch item data:", error);
        alert('Failed to load darshan details');
        navigate('/utemples');
      });
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChangeDarshan = (e) => {
    setSelectedDarshan(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phno) {
      alert('Please fill in all required fields');
      return;
    }

    try {
        console.log('Item:', item);
        console.log('Item darshanName:', item?.darshanName);
        console.log('Item templeName:', item?.templeName);
        console.log('Item prices:', item?.prices);
        console.log('Item prices:', item?.prices);
      // Ensure item is available and contains the required properties
      if (!item || !item.darshanName || !item.templeName || !item.prices) {
        console.error('Item data missing:', item);
        alert('Darshan data is incomplete. Please try again.');
        return;
      }

      const { organizerName, description, prices, darshanName, templeName, location, templeImage, organizerId, close, open } = item;

      const selectedPrice = parseInt(prices[selectedDarshan] || '0', 10);
      const totalAmount = (selectedPrice * quantity) + 45;
     
      // const quantity=quantity;
      const quantityValue = quantity;

      // Add the item properties to the formData
      const updatedFormData = {
        ...formData,
        quantity:quantityValue,
        totalamount: totalAmount,
        organizerName: organizerName || '',
        organizerId: organizerId || null,
        description: description || '',
        templeName: templeName || '',
        darshanName: darshanName || '',
        location: location || '',
        templeImage: templeImage || '',
        open: open || '',
        close: close || '',
      };

      // You can add user-specific data here
      const userData = localStorage.getItem('user');
      const user = userData && userData !== 'undefined' ? JSON.parse(userData) : null;
      if (!user) {
        alert('Please login to book darshan');
        navigate('/ulogin');
        return;
      }
      const userid = user.id;
      const username = user.name;
      updatedFormData.userId = userid;
      updatedFormData.userName = username;

      // Post the updatedFormData
      await axios.post('http://localhost:7000/user/userbooking', updatedFormData);
      console.log(updatedFormData);
      alert('booked successfully');
      navigate('/mybookings');
    } catch (error) {
      console.error('Error booking:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '' }}>
      <Unavbar />
      <div style={{ display: 'flex ' }} >
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
          {loading ? (
            <div className="text-center py-8">
              <p>Loading darshan details...</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold" >Your Booking is almost Done! </h2>
              {/* <p>item name:{item.itemtype}</p> */}
              <form onSubmit={handleSubmit}>

            <div >
              <label className="block text-gray-600 text-center" style={{ paddingTop: "10px" }}>Details:</label>
              <div class="input-container">

                <input type="text" id="myInput" class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" " style={{ width: "340px" }}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label for="myInput" class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
                 name
                </label>
              </div>
            </div><br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div >
                <div class="input-container">
                  <input type="text" id="myInput" class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "
                    style={{ width: "160px" }}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label for="myInput" class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
                    Email
                  </label>
                </div>
              </div>
              <div >
                <div class="input-container">
                  <input type="text" id="myInput" class="w-48 p-2 border border-gray-300 rounded focus:outline-none" placeholder=" "
                    style={{ width: "160px" }}
                    name="phno"
                    value={formData.phno}
                    onChange={handleChange}
                  />
                  <label for="myInput" class="absolute left-2 transform -translate-y-1/2 bg-white px-1 pointer-events-none transition-transform">
                    phno:-
                  </label>
                </div>
              </div>  
            </div>
            <br/>
            <div >
              <label>Your darshan</label>
              <div className="select-container"> {/* New div for styling */}
                <select value={selectedDarshan} onChange={handleChangeDarshan}>
                  <option value="normal">Normal Darshan</option>
                  <option value="vip">Vip Darshan</option>
                </select>
              </div>
            </div>
            <br />
            {item && item.prices &&(
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end", height: "100%", width: "100%" }} >
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <p style={{ fontSize: "17px" }}>Quantity:</p>
                 <div>
                 <button onClick={decrease}   type="button" style={{ backgroundColor: 'wheat',width:"20px",marginRight:"7px" }}>
                    -
                  </button>
                   {quantity}
                  <button onClick={increase}    type="button" style={{ backgroundColor: 'wheat',width:"20px",marginLeft:"7px" }} >
                    +
                  </button>
                 </div>
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
              <p style={{ fontSize: "17px" }}>Price:</p>
              <p> ₹ {quantity * item.prices[selectedDarshan]}</p>
            </div>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <p style={{ fontSize: "17px" }}>Convience Fee:</p>
                  <p>₹ 45</p>
                </div>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <p style={{ fontSize: "17px" }}>Total Amount:</p>
                  <p> ₹ {parseInt(quantity * item.prices[selectedDarshan]) + 45}</p>
                </div>
              </div>
            )}
            <button
              type="submit"
              style={{ width: "340px" }}
              className="bg-blue-400 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Book
            </button>
          </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookDarshan;
