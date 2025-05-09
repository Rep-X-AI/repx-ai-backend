const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  useruid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ['teacher', 'student'], default: 'student' }
  // assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }]    not needed anymore as we can access them directly from the assignment schema
});

const virtual = userSchema.virtual("id");
virtual.get(function () {
    return this._id;
});
userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

exports.User = mongoose.model('User', userSchema);