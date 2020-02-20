require("dotenv").config();
const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const md5 = require("md5");
// const router = express.Router();

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });

const app = express();
app.use(formidableMiddleware());
app.use(cors());

app.get("/perso", async (req, res) => {
  const publickey = process.env.PUBLIC_KEY;
  const privatekey = process.env.SECRET_KEY;
  const date = new Date();
  const ts = date.getTime().toString();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);

  try {
    const response = await axios.get(
      "http://gateway.marvel.com/v1/public/characters?ts=" +
        ts +
        "&apikey=" +
        publickey +
        "&hash=" +
        hash +
        "&limit=100"
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.get("/unique_perso/:id", async (req, res) => {
  const publickey = process.env.PUBLIC_KEY;
  const privatekey = process.env.SECRET_KEY;
  const date = new Date();
  const ts = date.getTime().toString();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);

  try {
    const response = await axios.get(
      "http://gateway.marvel.com/v1/public/characters/" +
        req.params.id +
        "/comics?ts=" +
        ts +
        "&apikey=" +
        publickey +
        "&hash=" +
        hash
    );
    console.log("response.data    ", response.data);

    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  const publickey = process.env.PUBLIC_KEY;
  const privatekey = process.env.SECRET_KEY;
  const date = new Date();
  const ts = date.getTime().toString();
  const stringToHash = ts + privatekey + publickey;
  const hash = md5(stringToHash);
  console.log(ts);
  console.log(publickey);
  console.log(hash);
  try {
    const response = await axios.get(
      "http://gateway.marvel.com/v1/public/comics?ts=" +
        ts +
        "&apikey=" +
        publickey +
        "&hash=" +
        hash +
        "&limit=100"
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
});

app.all("*", function(req, res) {
  res.status(404).json({ error: "Not Found" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});

// module.exports = router;
