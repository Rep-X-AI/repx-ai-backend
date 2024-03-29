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

exports.fetchAssignmentsOfTeacher = async (req, res) => {
    const { useruid } = req.params;
    try {
        const assignments = await Assignment.aggregate([
            { $match: { createdBy: useruid } },
            { $lookup: { from: 'users', localField: 'students', foreignField: 'useruid', as: 'students' } }
        ]);
        res.status(200).json({ assignments });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.fetchAssignmentsOfStudent = async (req, res) => {
    const { useruid } = req.params;
    try {
        const assignments = await Assignment.aggregate([
            { $match: { students: useruid } },
            { $lookup: { from: 'users', localField: 'createdBy', foreignField: 'useruid', as: 'teacher' } }
        ]);
        res.status(200).json({ assignments });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateAssignment = async (req, res) => {
    const { id } = req.params;
    try {
      const assignment = await Assignment.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(assignment);
    } catch (err) {
      res.status(400).json(err);
    }
  };