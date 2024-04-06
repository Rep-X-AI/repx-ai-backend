const { Assignment } = require("../model/Assignment");

async function generateUniqueCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const existingAssignment = await Assignment.findOne({ code: result }).exec();
    if (existingAssignment) {
      return generateUniqueCode(length);
    }
    return result;
  }

exports.createAssignment = async (req, res) => {
    const code = await generateUniqueCode(10);
    const assignment = new Assignment({ ...req.body, code: code });
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
            { $lookup: { from: 'users', localField: 'createdBy', foreignField: 'useruid', as: 'teacher' } },
            { $unwind: '$teacher' },
            { $project: { title: 1,  desc: 1, code: 1, questionUrl: 1, teacher: '$teacher.name' } }

        ]);
        res.status(200).json({ assignments });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteAssignment = async (req, res) => {
    const code = req.params.id;
    try {
        const assignment = await Assignment.findOneAndDelete({ code });
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json({ message: "Assignment deleted successfully" });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.updateAssignment = async (req, res) => {
    const code = req.params.id;
    try {
        const assignment = await Assignment.findOneAndUpdate({ code }, req.body, { new: true });
        res.status(200).json({ "assignment": assignment, "status": "updated" });
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.deleteAllSubmissions = async (req, res) => {
    const code = req.params.id;
    try {
        const result = await Assignment.updateOne({ code }, { $set: { submissions: [] } });
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: 'Submissions deleted successfully' });
        } else {
            return res.status(404).json({ message: 'No submissions to delete or assignment not found' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};

exports.joinAssignment = async (req,res) =>{
    const { code, uid } = req.body;
    try {
        const assignment = await Assignment.findOne({ code });
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        if (assignment.students.includes(uid)) {
            return res.status(409).json({ error: 'Student is already part of this assignment' });
        }
        assignment.students.push(uid);
        await assignment.save();
        res.status(200).json({ message: 'Student added to assignment successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
}