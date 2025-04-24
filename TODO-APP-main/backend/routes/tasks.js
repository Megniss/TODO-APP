const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Task = require('../models/Task');

// Helper function to validate ObjectId format
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET task by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate id
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Nederīgs ID formāts' });
  }

  try {
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: 'Nav atrasts' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title });
    const saved = await newTask.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE task by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate id
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Nederīgs ID formāts' });
  }

  try {
    await Task.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update task by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate id
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Nederīgs ID formāts' });
  }

  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        completed: req.body.completed
      },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
