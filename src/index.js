const express = require("express");
const utils = require("./utils");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get("/", async (req, res) => {
  const data = await utils.getData();
  res.json(data);
});

app.get("/world", async (req, res) => {
  const data = await utils.getData();
  const transfomedData = utils.parseData(data, "world");
  res.json(transfomedData);
});

app.get("/world/total", async (req, res) => {
  const data = await utils.getData();
  const transfomedData = utils.parseData(data, "world", true);
  res.json(transfomedData.total);
});

app.get("/world/last", async (req, res) => {
  const data = await utils.getData();
  const transfomedData = utils.parseData(data, "world", true);
  res.json(transfomedData);
});

app.get("/brazil", async (req, res) => {
  const data = await utils.getData();
  const transfomedData = utils.parseData(data, "brazil");
  res.json(transfomedData);
});

app.get("/brazil/total", async (req, res) => {
  const total = await utils.getTotal();
  res.json(total);
});

app.get("/brazil/last", async (req, res) => {
  const data = await utils.getData();
  const transfomedData = utils.parseData(data, "brazil", true);
  res.json(transfomedData);
});
