const { Assignment } = require("../model/Assignment");

exports.createAssignment = async (req, res) => {
    const { title, desc, createdBy, students, submissions ,questionUrl,modelAnsUrl} = req.body;
    try {
        const assignment = new Assignment({
            title: title,
            desc: desc,
            questionUrl: questionUrl,
            modelAnsUrl: modelAnsUrl, 
            createdBy: createdBy,
            students: students,
            submissions: submissions,
        });
        const doc = await assignment.save();
        res.status(201).json(doc);
    } catch (err) {
        res.status(400).send(err);
    }
};


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
            { $lookup: { from: 'users', localField: 'createdBy', foreignField: 'useruid', as: 'teacher' } },
            { $unwind: '$teacher' },
            { $project: { title: 1,  desc: 1, questionUrl: 1, teacher: '$teacher.name' } }

        ]);
        res.status(200).json({ assignments });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findByIdAndDelete(id);
        res.status(200).json({ "assignment": assignment, "status": "deleted" });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        const assignment = await Assignment.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ "assignment": assignment, "status": "updated" });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteAllSubmissions = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Assignment.updateOne({ _id: id }, { $set: { submissions: [] } });
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: 'Submissions deleted successfully' });
        } else {
            return res.status(404).json({ message: 'No submissions to delete or assignment not found' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};
