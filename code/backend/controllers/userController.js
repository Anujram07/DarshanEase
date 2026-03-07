const User = require('../models/User');
const Darshan = require('../models/Darshan');
const Booking = require('../models/Booking');


// User Login
exports.ulogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (user.password === password) {
                return res.json({
                    Status: "Success",
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            } else {
                return res.json("login fail");
            }
        } else {
            return res.json("no user");
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// User Signup
exports.usignup = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const existing = await User.findOne({ email });

        if (existing) {
            return res.json("Already have an account");
        }

        await User.create({
            name,
            email,
            password
        });

        res.json("Account Created");

    } catch {
        res.status(500).json({ error: "failed" });
    }
};



// Get All Users
exports.getUsers = async (req, res) => {

    try {

        const users = await User.find();

        res.status(200).json(users);

    } catch {
        res.sendStatus(500);
    }
};



// Get User By ID
exports.getUserById = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        res.status(200).json(user);

    } catch {

        res.sendStatus(500);
    }
};



// Update User
exports.updateUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true }
        );

        res.json(updated);

    } catch {

        res.status(500).send("Internal Server Error");
    }
};



// Delete User
exports.deleteUser = async (req, res) => {

    try {

        const result = await User.deleteOne({ _id: req.params.id });

        res.status(200).json(result);

    } catch {

        res.sendStatus(500);
    }
};



// Get All Darshans (THIS IS THE IMPORTANT API)
exports.getDarshans = async (req, res) => {

    try {

        const data = await Darshan.find();

        res.status(200).json(data);

    } catch {

        res.status(500).json({
            error: "Failed to fetch darshans"
        });
    }
};



// Get Single Darshan By ID
exports.getDarshanById = async (req, res) => {

    try {

        const item = await Darshan.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ error: 'Darshan not found' });
        }

        // Normalize data format for backward compatibility
        const normalizedItem = { ...item.toObject() };

        // If old format with 'price' field, convert to 'prices' object
        if (item.price && !item.prices) {
            normalizedItem.prices = {
                normal: item.price,
                vip: item.price // Use same price for both if only one exists
            };
            delete normalizedItem.price;
        }

        // Ensure prices object exists with default values
        if (!normalizedItem.prices) {
            normalizedItem.prices = { normal: '0', vip: '0' };
        }

        // Ensure required fields have defaults
        normalizedItem.darshanName = normalizedItem.darshanName || 'Unknown Darshan';
        normalizedItem.templeName = normalizedItem.templeName || 'Unknown Temple';
        normalizedItem.location = normalizedItem.location || '';
        normalizedItem.description = normalizedItem.description || '';
        normalizedItem.organizerName = normalizedItem.organizerName || '';
        normalizedItem.templeImage = normalizedItem.templeImage || '';
        normalizedItem.open = normalizedItem.open || '';
        normalizedItem.close = normalizedItem.close || '';

        res.json(normalizedItem);

    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};



// Create Booking
exports.createBooking = async (req, res) => {

    try {

        const order = new Booking(req.body);

        await order.save();

        res.status(201).json(order);

    } catch {

        res.status(400).json({
            error: "Failed to create booking"
        });
    }
};



// Get Bookings By User
exports.getBookingsByUser = async (req, res) => {

    try {

        const bookings = await Booking.find({
            userId: req.params.userId
        }).sort("position");

        res.json(bookings);

    } catch {

        res.status(500).json({
            error: "Failed to fetch bookings"
        });
    }
};



// Get All Bookings
exports.getAllBookings = async (req, res) => {

    try {

        const data = await Booking.find();

        res.json(data);

    } catch {

        res.status(400).json({
            error: "Failed to get bookings"
        });
    }
};



// Delete Booking
exports.deleteBooking = async (req, res) => {

    try {

        await Booking.deleteOne({
            _id: req.params.id
        });

        res.status(200).json("Booking deleted");

    } catch {

        res.status(400).json({
            msg: "No item found"
        });
    }
};