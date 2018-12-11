import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "@config";
// If want to export individual models
// import SampleModel from "src/app/sample/model";
const ROOT_DIR = path.dirname(require.main.filename);
const APP_DIR = `${ROOT_DIR}/src/app`;

const db = {};

let sequelize = null;
const { Op } = Sequelize;

/* eslint-disable no-console */

// Defining operator aliases
const operatorsAliases = {
  $gt: Op.gt,
  $gte: Op.gte,
  $ne: Op.ne,
  $in: Op.in,
  $or: Op.or,
  $and: Op.and,
  $like: Op.like,
  $between: Op.between,
  $lte: Op.lte,
  $notIn: Op.notIn,
};

//  Loading database configuration from setting based on environment
const databaseConf = config.database;
sequelize = new Sequelize(
  databaseConf.database,
  databaseConf.username,
  databaseConf.password,
  {
    host: databaseConf.host,
    dialect: databaseConf.dialect,
    operatorsAliases,
  },
);

// Method to check if a path refers to a file
const CheckFile = filePath => fs.statSync(filePath).isFile();

// Method to get models.js files list
const sortPath = (dir, folders) => {
  fs
    .readdirSync(dir)
    // To exclude files starting with .(dot) and index.js
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(res => {
      const filePath = path.join(dir, res);
      // If file path referes to a file named model.js proceed
      if (CheckFile(filePath)) {
        if (filePath.indexOf("model.js") !== -1) {
          files.push(filePath);
        }
      } else {
        // Adding dir path for furthur check
        folders.push(filePath);
      }
    });
};

const files = [];
const folders = [APP_DIR];
let i = 0;

// Iterating through app directory and checking for all model.js files
do {
  sortPath(folders[i], folders);
  i += 1;
} while (i < folders.length);

// Importing all the models
files.forEach(file => {
  console.log(file);
  const model = sequelize.import(file);
  db[model.name] = model;
});

// Associating sequelize models
Object.keys(db).forEach(modelName => {
  console.log(modelName);
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync({
//   logging: false,
// });

// Way to export individual model
// export const Sample = SampleModel(sequelize, Sequelize);

export default db;
