require("dotenv").config();
const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

const app = express();
app.use(formidableMiddleware());

app.get("/", (req, res) => {
  res.json({ message: "Hi" });
});

app.all("*", function(req, res) {
  res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => {
  console.log("Server has started");
});
