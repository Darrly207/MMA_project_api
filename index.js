const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const routes = require("./router/index");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Kết nối MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://1nguyenngocduy:hello@databasecuaduy.mp8gw.mongodb.net/MMA",
    {
      // Sử dụng biến môi trường
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Đăng ký các route
routes(app);

// Xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Xử lý lỗi chung
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
