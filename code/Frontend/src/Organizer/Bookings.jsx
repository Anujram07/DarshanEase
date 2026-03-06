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
        })
        .catch((error) => {
          console.error('Error fetching bookings: ', error);
        });
    }
  }, []);

  const calculateStatus = (Delivery) => {
    const currentDate = new Date();
    const formattedDeliveryDate = new Date(Delivery);

    if (formattedDeliveryDate >= currentDate) {
      return "Upcoming";
    } else {
      return "Completed";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Onavbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-3xl font-bold text-center text-orange-600 mb-10">
          Bookings
        </h3>

        <div className="space-y-6">
          {orders && orders.length > 0 ? (
            orders.map((item) => {
              const status = calculateStatus(item.date);

              return (
                <Card
                  key={item._id}
                  className="p-4 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4 items-center text-center">

                    <div>
                      <img
                        src={`http://localhost:7000/organizer/${item?.templeImage}`}
                        alt="temple"
                        className="h-20 mx-auto object-cover rounded-md"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Temple</p>
                      <p>{item.templeName}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Darshan</p>
                      <p>{item.darshanName}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Booking ID</p>
                      <p>{item._id.slice(0, 10)}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Devotee</p>
                      <p>{item.userName}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Organizer</p>
                      <p>{item.email}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Booking Date</p>
                      <p>{item.BookingDate}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Timing</p>
                      <p>{item.open} - {item.close}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Price</p>
                      <p>₹{item.totalamount}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-500">Qty</p>
                      <p>{item.quantity}</p>
                    </div>

                    {/* Optional Status */}
                    {/* 
                    <div>
                      <p className="font-semibold text-gray-500">Status</p>
                      <p className={status === "Upcoming" ? "text-green-600" : "text-gray-500"}>
                        {status}
                      </p>
                    </div>
                    */}

                  </div>
                </Card>
              );
            })
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No bookings yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bookings;