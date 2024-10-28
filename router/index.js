const productRouter = require("./productRouter");

const routes = (app) => {
  app.use("/api/product", productRouter);
  app.use("/api");
};

module.exports = routes;
