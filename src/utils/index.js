const fs = require("fs");
const axios = require("axios");
const codes = JSON.parse(fs.readFileSync("src/assets/codes.json", "utf8"));

const getData = async () => {
  try {
    const raw = await _getRaw();
    const data = _getJson(raw);
    return data;
    
  } catch (error) {
    throw new Error('api overload');
  }
};

const getTotal = async () => {
  const data = await getData();
  const transfomedData = parseData(data, "brazil", true);
  const output = {
    suspects: 0,
    refuses: 0,
    cases: 0,
    deaths: 0
  };

  output.suspects = _sum(transfomedData.values, "suspects");
  output.refuses = _sum(transfomedData.values, "refuses");
  output.cases = _sum(transfomedData.values, "cases");
  output.deaths = _sum(transfomedData.values, "deaths");

  return output;
};

const parseData = (data, mode, last = false) => {
  last ? (data = data[mode][data[mode].length - 1]) : (data = data[mode]);

  if (last) {
    data.values.forEach(element => {
      const country = codes.find(item => item.code === element.uid);
      country ? (element.name = country.name) : (element.name = "Unknown");
    });
  } else {
    data.map(item =>
      item.values.forEach(element => {
        const country = codes.find(item => item.code === element.uid);
        country ? (element.name = country.name) : (element.name = "Unknown");
      })
    );
  }

  return data;
};

const throwError = (res) => {
  res.statusCode = 500;
  res.statusMessage = "api overload";
  res.json({message: "api overload"});
} 

const _getRaw = async () => {
  try {
    var raw = await axios.get(
      "http://plataforma.saude.gov.br/novocoronavirus/resources/scripts/database.js"
    );
    return raw.data;
  } catch (error) {
    throw new Error('api overload');
  }
};

const _getJson = raw => {
  return JSON.parse(raw.split("=")[1]);
};

const _sum = (data, key) => {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
};

module.exports = { getData, getTotal, parseData, throwError };
