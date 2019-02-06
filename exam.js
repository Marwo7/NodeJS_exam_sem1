const yargs = require("yargs");

const {
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
} = require("./command_list");

const getInitialDataCommand = {
  command: "init",
  describe: "Reads a file with TODO app",
  handler: async () => {
    try {
      await getInitialData();
    } catch (error) {
      console.log(error.message);
    }
  }
};

const showAllCommand = {
  command: "all",
  describe: "Shows a list of all TODO records.",
  handler: async () => {
    try {
      await showAll();
    } catch (error) {
      console.log(error.message);
    }
  }
};

const addToListCommand = {
  command: "add",
  describe: "Adds a new record to the list: message, group.",
  handler: async () => {
    try {
      await addToList(process.argv[3], process.argv[4]);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const deleteFromListCommand = {
  command: "delete",
  describe: "Erases a record with selected ID from the list.",
  handler: async () => {
    try {
      await deleteFromList(process.argv[3]);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const changeStatusCommand = {
  command: "change",
  describe: "Changes status of a record.",
  handler: async () => {
    try {
      await changeStatus(process.argv[3]);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const showInProgressCommand = {
  command: "in progress",
  describe: "Shows a list of records in progress",
  handler: async () => {
    try {
      await showInProgress();
    } catch (error) {
      console.log(error.message);
    }
  }
};

const showDoneCommand = {
  command: "done",
  describe: "Shows a list of done records.",
  handler: async () => {
    try {
      await showDone();
    } catch (error) {
      console.log(error.message);
    }
  }
};

const showByGroupCommand = {
  command: "group",
  describe: "Shows a list of TODO records filtered by their group.",
  handler: async () => {
    try {
      await showByGroup(process.argv[3]);
    } catch (error) {
      console.log(error.message);
    }
  }
};

const sendDataCommand = {
  command: "upload",
  describe: "Uploads data to the server.",
  handler: async () => {
    try {
      await sendData();
    } catch (error) {
      console.log(error.message);
    }
  }
};

const getDataCommand = {
  command: "download",
  describe: "Downloads data from the server.",
  handler: async () => {
    try {
      await getData();
    } catch (error) {
      console.log(error.message);
    }
  }
};

yargs
  .command(getInitialDataCommand)
  .command(showAllCommand)
  .command(addToListCommand)
  .command(deleteFromListCommand)
  .command(changeStatusCommand)
  .command(showInProgressCommand)
  .command(showDoneCommand)
  .command(showByGroupCommand)
  .command(sendDataCommand)
  .command(getDataCommand).argv;
