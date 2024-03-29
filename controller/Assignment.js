const { Assignment } = require("../model/Assignment");

exports.createAssignment = async (req, res) => {
    const assignment = new Assignment(req.body);
    try {
        const doc = await assignment.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).send(err);
    }
}

