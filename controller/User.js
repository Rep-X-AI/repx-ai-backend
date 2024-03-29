const { User } = require("../model/User");

exports.createUser = async(req, res) => {
    const user = new User(req.body);
    try {
        const doc = await user.save();
        res.status(201).json({id: doc.useruid, role: doc.role});
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.fetchUserById = async(req, res) => {
    const { useruid } = req.params;
    try {
        const user = await User.findOne({ useruid });
        if (user) {
            const role = user.role;
            res.status(200).json({ exists: true, role });
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}