import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Onavbar from './Onavbar';

function Bookings() {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      axios
        .get(`http://localhost:7000/organizer/getorganizerbookings/${user.id}`)
        .then((response) => {
          setOrders(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching bookings: ', error);
        });
    }

  }, []);

  // Calculate Booking Status
  const calculateStatus = (BookingDate) => {
    const currentDate = new Date();
    const bookingDate = new Date(BookingDate);

    if (bookingDate >= currentDate) {
      return "Upcoming";
    } else {
      return "Completed";
    }
  };

  // Cancel booking
  const cancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/organizer/cancelbooking/${id}`);
      alert("Booking Cancelled");

      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <Onavbar />

      <div className="container mx-auto px-6 py-8">

        <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Temple Bookings
        </h3>

        {orders.length > 0 ? (

          orders.map((item) => {

            const status = calculateStatus(item.BookingDate);

            return (

              <Card
                key={item._id}
                className="mb-6 shadow-lg rounded-xl border-0"
                style={{
                  width: "85%",
                  margin: "auto"
                }}
              >

                <div className="flex flex-wrap items-center justify-between p-6">

                  {/* Temple Image */}
                  <div>
                    <img
                      src={`http://localhost:7000/organizer/${item?.templeImage}`}
                      alt="Temple"
                      className="h-[100px] w-[120px] object-cover rounded-lg shadow"
                    />
                  </div>

                  {/* Temple Name */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Temple</p>
                    <p className="text-lg">{item.templeName}</p>
                  </div>

                  {/* Darshan */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Darshan</p>
                    <p>{item.darshanName}</p>
                  </div>

                  {/* Booking ID */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Booking ID</p>
                    <p>{item._id.slice(0,10)}</p>
                  </div>

                  {/* Devotee */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Devotee</p>
                    <p>{item.userName}</p>
                  </div>

                  {/* Organizer */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Organizer</p>
                    <p>{item.email}</p>
                  </div>

                  {/* Booking Date */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Booking Date</p>
                    <p>{item.BookingDate}</p>
                  </div>

                  {/* Timing */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Darshan Time</p>
                    <p>{item.open} - {item.close}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Price</p>
                    <p>₹ {item.totalamount}</p>
                  </div>

                  {/* Quantity */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Tickets</p>
                    <p>{item.quantity}</p>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <p className="font-semibold text-gray-600">Status</p>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm
                      ${status === "Upcoming" ? "bg-green-500" : "bg-gray-500"}`}
                    >
                      {status}
                    </span>
                  </div>

                  {/* Cancel Button */}
                  <div>
                    <button
                      onClick={() => cancelBooking(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                      Cancel
                    </button>
                  </div>

                </div>

              </Card>
            );

          })

        ) : (

          <h3 className="text-center text-gray-500 text-xl">
            No Bookings Yet
          </h3>

        )}

      </div>

    </div>
  );
}

export default Bookings;