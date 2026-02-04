const TodoItem = require("../models/TodoItem");

exports.createTodoItem = async (req, res, next) => {
  try {
    const { task, date } = req.body;
    const todoItem = new TodoItem({ task, date });
    await todoItem.save();
    res.status(201).json({ success: true, todoItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTodoItems = async (req, res, next) => {
  try {
    const todoItems = await TodoItem.find();
    res.status(201).json({ success: true, todoItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteTodoItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await TodoItem.findByIdAndDelete(id);
    res.status(204).json({ success: true, _id: id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markCompleted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoItem = await TodoItem.findById(id);
    todoItem.completed = true;
    await todoItem.save();
    res.status(201).json({ success: true, todoItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
