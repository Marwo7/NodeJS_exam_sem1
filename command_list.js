const fs = require("fs");
const axios = require("axios");

function getInitialData() {
  try {
    return JSON.parse(fs.readFileSync("./data.json"));
  } catch (err) {
    console.log("There is no file data.json, I'm creating it for you");
    fs.writeFileSync("data.json", "[]");
    return JSON.parse(fs.readFileSync("./data.json", "utf8"));
  }
}

const data = getInitialData();

function showAll() {
  console.log("All things to do:");
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == "in progress" || data[i].status == "done") {
      console.log(`${data[i].id}. ${data[i].message} (${data[i].status}).`);
    }
  }
}

function addToList(message, group) {
  var maxid = 0;

  data.map(function(task) {
    if (task.id > maxid) {
      maxid = task.id;
    }
  });
  let newRecord = {
    id: maxid + 1,
    message,
    status: "in progress",
    group
  };
  data.push(newRecord);
  let dataStringified = JSON.stringify(data);
  fs.writeFileSync("./data.json", dataStringified);
  console.log("New thing added to list!");
}

function deleteFromList(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == id) {
      data.splice(data.indexOf(data[i]), 1);
    }
  }
  console.log(`Position ${id} record deleted.`);
  let dataStringified = JSON.stringify(data);
  fs.writeFileSync("./data.json", dataStringified);
}

function changeStatus(id) {
  if (data[id - 1].status == "in progress") {
    data[id - 1].status = "done";
  } else if (data[id - 1].status == "done") {
    data[id - 1].status = "in progress";
  }
  let dataStringified = JSON.stringify(data);
  fs.writeFileSync("./data.json", dataStringified);
  console.log("Status changed!");
}

function showInProgress() {
  console.log("Things in progress:");
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == "in progress") {
      console.log(`${data[i].id}. ${data[i].message} (${data[i].status}).`);
    }
  }
}

function showDone() {
  console.log("Done things:");
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == "done") {
      console.log(`${data[i].id}. ${data[i].message} (${data[i].status}).`);
    }
  }
}

function showByGroup(group) {
  if (group == undefined) {
    console.log("Type a name of group");
  } else {
    console.log(`Things filtered by "${group}" group:`);
    for (let i = 0; i < data.length; i++) {
      if (data[i].group == group) {
        console.log(`${data[i].id}. ${data[i].message} (${data[i].status}).`);
      }
    }
  }
}

// send and get data

async function sendData() {
  try {
    const newData = JSON.stringify(data);
    const result = await axios.post(
      "http://api.quuu.linuxpl.eu/todo/afaodlol",
      newData
    );
    console.log("Data uploaded. Status code:", result.status);
  } catch (error) {
    error => console.log(error);
  }
}

async function getData() {
  try {
    const result = await axios.get("http://api.quuu.linuxpl.eu/todo/afaodlol");
    console.log("Download completed.");
    const resultToSave = JSON.stringify(result.data);
    fs.writeFileSync("./data.json", resultToSave);
    console.log("data.json file updated.");
  } catch (error) {
    error => console.log(error);
  }
}

module.exports = {
  getInitialData,
  showAll,
  addToList,
  deleteFromList,
  changeStatus,
  showInProgress,
  showDone,
  showByGroup,
  sendData,
  getData
};
