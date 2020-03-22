const express = require("express");
const cors = require("cors");
const utils = require("./utils");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", async (req, res) => {
  try {
    const data = await utils.getData();
    res.json(data);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/v2", async (req, res) => {
  try {
    const data = await utils.getData(2);
    res.json(data);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/world", async (req, res) => {
  try {
    const data = await utils.getData();
    const transfomedData = utils.parseData(data, "world");
    res.json(transfomedData);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/world/total", async (req, res) => {
  try {
    const data = await utils.getData();
    const transfomedData = utils.parseData(data, "world", true);
    res.json(transfomedData.total);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/world/last", async (req, res) => {
  try {
    const data = await utils.getData();
    const transfomedData = utils.parseData(data, "world", true);
    res.json(transfomedData);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/brazil", async (req, res) => {
  try {
    const data = await utils.getData();
    const transfomedData = utils.parseData(data, "brazil");
    res.json(transfomedData);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/v2/brazil", async (req, res) => {
  try {
    const data = await utils.getData(2);
    const transfomedData = utils.parseData(data, "brazil", true, 2);
    res.json(transfomedData);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/brazil/total", async (req, res) => {
  try {
    const total = await utils.getTotal();
    res.json(total);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/v2/brazil/total", async (req, res) => {
  try {
    const total = await utils.getTotal(2);
    res.json(total);
  } catch (error) {
    utils.throwError(res, error);
  }
});

app.get("/brazil/last", async (req, res) => {
  try {
    const data = await utils.getData();
    const transfomedData = utils.parseData(data, "brazil", true);
    res.json(transfomedData);
  } catch (error) {
    utils.throwError(res, error);
  }
});
