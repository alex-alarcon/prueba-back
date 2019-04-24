const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const parser = require('body-parser');

const indexRouter = require('./routes/index');

const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(logger('dev'));
app.use(parser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/', indexRouter);

app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = 'Not Found!';

  const response = errorHandler(error); 
  res.status(response.status);
  res.json({
    error: {
      message: response.message
    }
  });
  res.end();
});

app.use((error, req, res, next) => {
  const response = errorHandler(error);
  res.status(response.status);
  res.json({
    error:{
      message: response.message
    }
  })
});

module.exports = app;
