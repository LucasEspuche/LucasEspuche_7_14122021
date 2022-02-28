const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const profileRoutes = require("./routes/profile");

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/profile', profileRoutes);

module.exports = app;