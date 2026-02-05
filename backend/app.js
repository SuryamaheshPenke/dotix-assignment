const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const jobRoutes = require('./routes/jobs');
app.use('/', jobRoutes);

app.listen(5000, () => {
  console.log('Backend running on port 5000');
});
