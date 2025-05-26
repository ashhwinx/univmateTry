// routes/materialRoutes.js
const express = require('express');
const Material = require('../model/Material');

const router = express.Router();

// Get all subjects for a section
router.get('/:section', async (req, res) => {
  const data = await Material.find({ section: req.params.section });
  res.json(data);
});


// Update a specific unit by subject ID and unit index
router.put('/update-unit/:id', async (req, res) => {
  const { subjectId, unitIndex, newName, newLink } = req.body;

  try {
    const subject = await Material.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ success: false, message: 'Subject not found' });
    }

    if (unitIndex < 0 || unitIndex >= subject.units.length) {
      return res.status(400).json({ success: false, message: 'Invalid unit index' });
    }

    subject.units[unitIndex].name = newName;
    subject.units[unitIndex].driveLink = newLink;

    await subject.save();
    return res.json({ success: true, message: 'Unit updated successfully' });
  } catch (err) {
    console.error('Error updating unit:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add a new subject
router.post('/add-subject', async (req, res) => {
  try {
    const { section, subjectName, type, units } = req.body; // ← add `type`
    const newSubject = new Material({ section, subjectName, type, units }); // ← include `type`
    await newSubject.save();
    res.status(201).json({ success: true, message: "Subject added successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Get Class Notes for a section
router.get('/:section/classnotes', async (req, res) => {
  const { section } = req.params;
  const data = await Material.find({ section, type: 'classnotes' });
  res.json(data);
});

// Get PYQs for a section
router.get('/:section/pyq', async (req, res) => {
  const { section } = req.params;
  const data = await Material.find({ section, type: 'pyq' });
  res.json(data);
});

// Get Assignments for a section
router.get('/:section/assignment', async (req, res) => {
  const { section } = req.params;
  const data = await Material.find({ section, type: 'assignment' });
  res.json(data);
});

// Get lab for a section
router.get('/:section/lab', async (req, res) => {
  const { section } = req.params;
  const data = await Material.find({ section, type: 'lab' });
  res.json(data);
});

module.exports = router;