require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const beerRoutes = require("./routes/beerRoutes");
const db = require("./models/beerModel");

const app = express();

// Middlewares to parse JSON bodies and misc
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Initializing the database
db.init();

// Routes
app.use("/api/beers", beerRoutes);

// Guard routes
app.use((req, res, next) => {
  const error = {
    status: 404,
    message: "Route not found",
  };
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  console.log("ERROR", error);
  res.json({
    error: {
      message: error.message,
      status: error.status,
    },
  });
});

// Start the server
const port = process.env.PORT || 4343;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
