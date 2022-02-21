require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const postsRoutes = require('./routes/postsRoutes');

const PORT = process.env.SERVER_PORT || 5000;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello express');
});

app.use('/', postsRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
