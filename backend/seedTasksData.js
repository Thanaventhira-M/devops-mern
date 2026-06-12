const mongoose = require('mongoose');

const MONGO_URL =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo-db';

const taskSchema = new mongoose.Schema({
  text: String,
});

const Task = mongoose.model('Task', taskSchema);

async function seedTasks() {
  try {
    await mongoose.connect(MONGO_URL);

    console.log('Connected to MongoDB');

    await Task.deleteMany({});

    await Task.insertMany([
      { text: 'Send email to client' },
      { text: 'Buy groceries for the week' },
      { text: 'Schedule dentist appointment' },
      { text: 'Finish reading chapter 5' },
      { text: 'Go for a 30-minute walk' },
      { text: 'Prepare presentation slides' },
      { text: 'Call mom' },
      { text: 'Clean the workspace' },
      { text: 'Pay electricity bill' },
      { text: 'Organize photo gallery' },
    ]);

    console.log('Tasks seeded');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedTasks();