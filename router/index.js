const productRouter = require("./productRouter");
const orderRouter = require("./orderRouter");
const routes = (app) => {
  app.use("/api/product", productRouter);
  app.use("/api", orderRouter);
};

module.exports = routes;
