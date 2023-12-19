const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://mitali:mAItIPCBLt4rhHxh@cluster0.ctxlygc.mongodb.net/yogaDb?retryWrites=true&w=majority`;

const db = async()=>{
  return mongoose
		.connect(uri)
		.then(() => {
			console.log("Connected to MongoDB successfully.");
		})
		.catch((err) => {
			console.error(err.message);
			process.exit(1); // If the MongoDB connection is not made, stop the server
		});
}

// Define admission schema
const admissionSchema = new mongoose.Schema({
  name: String,
  age: Number,
  selectedBatch: String,
  enrolledAt: { type: Date, default: Date.now },
});

// Create Admission model
const Admission = mongoose.model('Admission', admissionSchema);
app.get('/api',(req,res)=>{
  return res.status(200).json({message:"Working Fine"});
})
// API endpoint for submitting admission
app.post('/api/admission', async (req, res) => {
  try {
    const { name, age, selectedBatch } = req.body;
    console.log(JSON.stringify(req.body));
    if (age < 18 || age > 65) {
      return res.status(400).json({ error: 'Age must be between 18 and 65.' });
    }
    console.log(selectedBatch);
    const validBatches = ['6 - 7 AM', '7 - 8 AM', '8 - 9 AM', '5 - 6 PM'];
    if (!validBatches.includes(selectedBatch)) {
      return res.status(400).json({ error: 'Invalid batch. Choose from 6-7AM, 7-8AM, 8-9AM, 5-6PM.' });
    }

    const newAdmission= new Admission( { name, age, selectedBatch } );

    await newAdmission.save();

    return res.status(201).json({ message: 'Enrollment successful.' });
  }catch (error) {
    console.error('Error enrolling participant:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/changeBatch', async (req, res) => {
console.log("1");
  try{

  const { name, newBatch } = req.body;
    console.log(req.body);
    const participant = await Admission.findOne({ name });
    // Check if the enrolled month is not the current month
    const enrolledMonth = participant.enrolledAt.getMonth();
    const currentMonth = new Date().getMonth();

    if (enrolledMonth !== currentMonth) {
      // Update both selectedBatch and enrolledAt fields
      const updatedParticipant = await Admission.findOneAndUpdate(
        { name },
        { $set: { selectedBatch: newBatch, enrolledAt: new Date() } },
        { new: true } // Return the updated document
      );
      console.log("Done");

      return res.status(201).json({ message: 'Enrollment Done.' });
    } else {
      return res.status(400).json({ message: 'Enrollment Not Done.' });
    }
  }catch (error) {
    console.error('Error changing batch:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Serve static files (for production deployment)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  db();
  console.log(`Server is running on port ${PORT}`);
});
