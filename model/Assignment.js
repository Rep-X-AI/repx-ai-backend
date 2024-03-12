const mongoose = require('mongoose');
const {Schema} = mongoose;

const assignmentSchema = new Schema ({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    questionUrl: {type: String, required: true},     // needs to be modified if questions are taken as input from a form
    modelAnsUrl: {type: String, required: true},
    // deadline: {type: Date, required: true},      // this is optional (logic can be implemented later)
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},     // stores id of the teacher who created
    students:  [{type: Schema.Types.ObjectId, ref: 'User'}],    // stores all the ids of the assigned students
    submissions: [{
        student: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        answerUrl: {type: String, required: true},
        marks: {type: Number, default: null},
        isEvaluated: {type: Boolean, default: false}
    }]
});


exports.Assignment = mongoose.model('Assignment', assignmentSchema);