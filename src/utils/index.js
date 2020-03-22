const fs = require("fs");
const axios = require("axios");
const codes = JSON.parse(fs.readFileSync("src/assets/codes.json", "utf8"));

const getData = async (source = 1) => {
  try {
    const raw = await _getRaw(source);
    const data = _getJson(raw, source);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const getTotal = async (source = 1) => {
  let data;
  let output;
  switch (source) {
    case 1:
      data = await getData();
      const transfomedData = parseData(data, "brazil", true);
      output = {
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
    case 2:
      data = await getData(2);
      const docs = data.docs;
      const cases = docs.map(item => item.cases);
      output = {
        cases: 0
      };
      output.cases = cases.reduce((a, b) => a + b, 0);

      return output;
  }
};

const parseData = (data, mode, last = false, source = 1) => {
  switch (source) {
    case 1:
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
            country
              ? (element.name = country.name)
              : (element.name = "Unknown");
          })
        );
      }

      return data;

    case 2:
      let output = {
        cases: [],
        updated_at: ""
      };
      

      const grouped = _groupBy(data.docs, "state_cod");
      
      const parsed = grouped.map((item, index) => {
        return {
          state: item[0].state,
          state_name: codes.find(item => item.code === index).name,
          cases: _sum(item, "cases"),
        }
      });

      output.cases = parsed.filter(function(e){return e});
      output.updated_at = data.updated_at;

      return output;
  }
};

const throwError = (res, error) => {
  res.statusCode = 500;
  res.statusMessage = error.message;
  res.json({ message: error.message });
};

const _getRaw = async source => {
  try {
    let raw;
    switch (source) {
      case 1:
        raw = await axios.get(
          "http://plataforma.saude.gov.br/novocoronavirus/resources/scripts/database.js"
        );
        return raw.data;
      case 2:
        raw = await axios.get(
          "https://especiais.g1.globo.com/bemestar/coronavirus/mapa-coronavirus/data/brazil-cases.json"
        );
        return raw.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const _getJson = (raw, source) => {
  switch (source) {
    case 1:
      let splited = raw.split("=");
      if (splited.length > 1) {
        return JSON.parse(raw.split("=")[1]);
      } else {
        return { message: "Source Unavailable" };
      }
    case 2:
      return raw;
  }
};

const _sum = (data, key) => {
  return data.reduce((a, b) => a + (b[key] || 0), 0);
};

const _groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, []);
};

module.exports = { getData, getTotal, parseData, throwError };
