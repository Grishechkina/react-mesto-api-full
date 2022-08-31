const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(requestLogger);

app.use(cors(
  {
    origin: [
      'https://paw.patrol.nomoredomains.sbs/',
      'http://paw.patrol.nomoredomains.sbs/',
      'https://api.paw.patrol.nomoredomains.sbs',
      'http://api.paw.patrol.nomoredomains.sbs',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  },
));
app.use(routes);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => { });
