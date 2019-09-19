'use strict';

const express 	= require("express"); 
const app 	= express();
const request 	= require("request");

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const policiesRouter = require('./routes/policies');

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});


app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/policies', policiesRouter);

app.use((req, res, next) => {
  res.status(404);
  res.send('<h1>404 Not-Found</h1>');
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500);
    res.send('error');
  }
});

module.exports = app;
