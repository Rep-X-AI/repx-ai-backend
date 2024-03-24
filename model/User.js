const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String},
    role: {type: String, enum: ['teacher', 'student'], default: 'student'},
    assignments: [{type: Schema.Types.ObjectId, ref: 'Assignment'}]
});

exports.User = mongoose.model('User', userSchema);