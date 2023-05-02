require("express-async-errors");

const database = require("./database/sqlite");

const AppError = require("./utils/AppError");

const usersRouter = require("./users.routes");

const express = require('express');

const routes = require("./routes"); // carrega por padrao o index 

const app = express();
app.use(express.json());

app.use(routes);

database();

app.use(( error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));