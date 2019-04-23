const errorHandler = error => {
  const handlers = [handle400, handle404];

  for (const handler of handlers) {
    const err = handler(error);

    if (err !== null) {
      return err;
    }
  }
}

const handle400 = error => {
  if (error.name === 'ValidationError') {
    const errors = Object.keys(error.errors).reduce((errs, next) => {
      errs[next] = error.errors[next].message;
      return errs;
    }, {});

    const err = {
      status: 400,
      message: errors
    };

    return err;
  }

  if (error.statusCode === 400) {
    const err = {
      status: 400,
      message: 'Syntax Error!'
    };

    return err;
  }
  return null;
}

const handle404 = error => { 
  if(error.message === 'Not Found!' || error.name === 'CastError') {
    const err = {
      status: 404,
      message: 'Not Found!'          
    };
    return err;
  }
  
  return null;
}

module.exports = errorHandler;