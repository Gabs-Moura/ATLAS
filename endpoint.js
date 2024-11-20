const express = require('express');
const { spawn } = require('child_process');
const app = express();
app.use(express.json());

app.post('/api/predict', (req, res) => {
  const { weather, event, time_of_day, renewable_allocation, current_capacity } = req.body;

  const python = spawn('python', ['predict.py', weather, event, time_of_day, renewable_allocation, current_capacity]);

  python.stdout.on('data', (data) => {
    res.json({ prediction: data.toString() });
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
