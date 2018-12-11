// Importing initial schema for the model
import initialSchema from "./schema";

// Sequelize model name
const modelName = "Table2";

export default sequelize => {
  const Table = sequelize.define(modelName, initialSchema, {
    classMethods: {},
  });

  // Model relations should be defined here
  // Table.associate = models => {
  //   // associations can be defined here
  // };

  /*
    toJSON() will be called whenever sequelize object will
    be stringified, so that moment we can exclude some properties
    which we don't want actual user to receieve Ex: password, salt
  */
  Table.prototype.toJSON = function toJSON() {
    const values = this.get({
      plain: true,
    });
    delete values.createdAt;
    delete values.updatedAt;
    delete values.status;
    return values;
  };
  return Table;
};
