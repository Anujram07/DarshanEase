const Organizer = require('../models/Organizer');
const Temple = require('../models/Temple');
const Darshan = require('../models/Darshan');
const Booking = require('../models/Booking');

// Organizer Login
exports.ologin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const organizer = await Organizer.findOne({ email });

        if (organizer) {
            if (organizer.password === password) {
                return res.json({
                    Status: "Success",
                    organizer: {
                        id: organizer.id,
                        name: organizer.name,
                        email: organizer.email
                    }
                });
            } else {
                return res.json("login fail");
            }
        } else {
            return res.json("no organizer");
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Organizer Signup
exports.osignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existing = await Organizer.findOne({ email });

        if (existing) {
            return res.json("Already have an account");
        }

        await Organizer.create({ name, email, password });
        res.json("Account Created");
    } catch (err) {
        res.status(500).json({ error: "failed" });
    }
};

// Get all organizers
exports.getOrganizers = async (req, res) => {
    try {
        const organizers = await Organizer.find();
        res.json(organizers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get organizer by ID
exports.getOrganizerById = async (req, res) => {
    try {
        const organizer = await Organizer.findById(req.params.id);
        if (!organizer) return res.status(404).json({ error: "Organizer not found" });
        res.json(organizer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update organizer
exports.updateOrganizer = async (req, res) => {
    try {
        const updatedOrganizer = await Organizer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrganizer) return res.status(404).json({ error: "Organizer not found" });
        res.json(updatedOrganizer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete organizer
exports.deleteOrganizer = async (req, res) => {
    try {
        const deletedOrganizer = await Organizer.findByIdAndDelete(req.params.id);
        if (!deletedOrganizer) return res.status(404).json({ error: "Organizer not found" });
        res.json({ message: "Organizer deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTemple = async (req, res) => {

    const { organizerId, templeName, location, open, close, description } = req.body;

    try {

        const templeImage = req.file ? req.file.filename : "";
        console.log("Uploaded file:", req.file);
        console.log("Temple image filename:", templeImage);

        const temple = new Temple({
            organizerId,
            templeName,
            location,
            open,
            close,
            description,
            templeImage
        });

        const savedTemple = await temple.save();
        console.log("Saved temple:", savedTemple);

        res.status(201).json({
            message: "Temple created successfully",
            temple: savedTemple
        });

    } catch (error) {

        console.log("Temple creation error:", error);

        res.status(500).json({
            error: "Failed to create temple"
        });

    }
};

// Get temple by organizer
exports.getTempleByOrganizer = async (req, res) => {
    try {
        const temples = await Temple.find({ organizerId: req.params.organizerId });
        res.json(temples);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all temples
exports.getTemples = async (req, res) => {
    try {
        const temples = await Temple.find();
        res.json(temples);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get temple by ID
exports.getTempleById = async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.templeId);
        if (!temple) return res.status(404).json({ error: "Temple not found" });
        res.json(temple);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update temple
exports.updateTemple = async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.templeImage = req.file.filename;
        }
        const updatedTemple = await Temple.findByIdAndUpdate(req.params.templeId, updateData, { new: true });
        if (!updatedTemple) return res.status(404).json({ error: "Temple not found" });
        res.json(updatedTemple);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete temple
exports.deleteTemple = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Deleting temple with ID:", id);
        const deletedTemple = await Temple.findByIdAndDelete(id);
        if (!deletedTemple) {
            console.log("Temple not found");
            return res.status(404).json({ error: "Temple not found" });
        }
        console.log("Temple deleted successfully");
        res.json({ message: "Temple deleted" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: err.message });
    }
};

// Create darshan
exports.createDarshan = async (req, res) => {
    const { organizerId, organizerName, templeName, location, templeImage, darshanName, description, prices, open, close } = req.body;

    try {
        const darshan = new Darshan({
            organizerId,
            organizerName,
            templeName,
            location,
            templeImage,
            darshanName,
            description,
            prices,
            open,
            close
        });

        const savedDarshan = await darshan.save();
        res.status(201).json({
            message: "Darshan created successfully",
            darshan: savedDarshan
        });
    } catch (error) {
        console.error("Create darshan error:", error);
        res.status(500).json({ error: "Failed to create darshan" });
    }
};

// Get darshans by organizer
exports.getDarshanByOrganizer = async (req, res) => {
    try {
        const darshans = await Darshan.find({ organizerId: req.params.organizerId });
        res.json(darshans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all darshans
exports.getDarshans = async (req, res) => {
    try {
        const darshans = await Darshan.find();
        res.json(darshans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get organizer bookings
exports.getOrganizerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ organizerId: req.params.userId }); // Assuming userId is organizerId
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
        if (!deletedBooking) return res.status(404).json({ error: "Booking not found" });
        res.json({ message: "Booking deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};