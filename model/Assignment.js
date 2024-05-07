const mongoose = require('mongoose');
const {Schema} = mongoose;

const assignmentSchema = new Schema ({
    title: {type: String, required: true},
    code: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    isEvaluated: {type: Boolean, default: false},
    isPublished: {type: Boolean, default: false},
    questionUrl: {type: String, required: true},     // needs to be modified if questions are taken as input from a form
    modelAnsUrl: {type: String, required: true},
    diagramurl: {type: String, required: true},
    deadline: {type: Date, required: true},      // this is optional (logic can be implemented later)
    createdBy: {type: String, ref: 'User', required: true},     // stores useruid of the teacher who created
    teacherName: {type: String, required: true},  // stores teacher's name i guess and it's working
    tmarks : {type: Number, required: true, default: null},
    students:  [{type: String, ref: 'User'}],    // stores all the useruids of the assigned students
    submissions: [{
        student: {type: String, ref: 'User', required: true},   // student will store the useruid of the student an not mongodb id
        studentname:{type: String,required:true},
        answerUrl: {type: String, required: true},
        marks: {type: Number, default: null}
    }]
});

const virtual = assignmentSchema.virtual("id");
virtual.get(function () {
    return null;
});
assignmentSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});


exports.Assignment = mongoose.model('Assignment', assignmentSchema);
