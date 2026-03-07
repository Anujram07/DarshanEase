exports.createTemple = async (req, res) => {

    const { organizerId, templeName, location, open, close, description } = req.body;

    try {

        const temple = new Temple({
            organizerId,
            templeName,
            location,
            open,
            close,
            description
        });

        const savedTemple = await temple.save();

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