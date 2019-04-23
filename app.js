const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');

const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
