const express = require("express");
const app = new express();
const morgan = require("morgan");
app.use(morgan("dev"));
const cors = require("cors");
app.use(cors());

require("dotenv").config();
require("./db/connection");
app.use(express.json());


const basicRoute2 = require("./routes/mentorRoutes");
app.use("/mentor", basicRoute2);
const basicRoute3 = require("./routes/projectRoutes");
app.use("/project", basicRoute3);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
