require('dotenv').config();
require('express-async-errors');

// main requirement for app
const express = require('express');
const app = express();
const connectDB = require('./db/connectDB');
const PORT = process.env.PORT || 5000;
const http = require('http');
const server = http.createServer(app);
var io = require('socket.io');

// const socketController = require('./socket')(io);

// SMTP server
const SMTPServer = require('smtp-server').SMTPServer;

// rest packages
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// use packages
// app.set('trust proxy', 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// );
app.use(express.json());
app.use(fileUpload());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));

// routes
const userRouter = require('./routes/userRoutes');
const tweetRouter = require('./routes/tweetRoutes');
const bookMarkRouter = require('./routes/bookMarkRoutes');

app.use(express.static(path.resolve(__dirname, './public')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'login.html'));
});

// io = io(server);
const SocketService = require('./socket');

var io = new SocketService(server);
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// io.on('connection', function (socket) {
//   console.log(socket.id);
//   console.log('user connected');
//   // console.log('socket.io connection made');
// });

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/book-marks', bookMarkRouter);

// not found and errors handler
const errorHanlder = require('./middleware/error-handler');
const notFoundHanlder = require('./middleware/not-found');

app.use(errorHanlder);
app.use(notFoundHanlder);

// starting app
const User = require('./models/User');
const { QueryInterface } = require('sequelize');
const Tweet = require('./models/Tweet');
const Following = require('./models/following');
const BookMark = require('./models/BookMark');
const Like = require('./models/Like');

const start = async () => {
  try {
    await connectDB.sync();
    // await User.sync({ alter: true });
    // await BookMark.sync({ alter: true });
    // await Tweet.sync({ alter: true });
    // await Following.sync({ alter: true });
    // await Like.sync({ alter: true });
    console.log('connected to Database ...');
    server.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
