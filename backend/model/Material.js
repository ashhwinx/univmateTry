const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: String,
  driveLink: String,
});

const materialSchema = new mongoose.Schema({
  section: String,
  subjectName: String,
  units: [unitSchema],
  type: {
    type: String,
    enum: ['classnotes', 'pyq', 'assignment',"lab"], // 👈 type of material
    required: true
  }
});

module.exports = mongoose.model('Material', materialSchema);
