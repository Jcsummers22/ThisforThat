// creating Owner model
// Exporting makes the Owner Model available for other files.
// This will also create a table when server.js is run.
module.exports = function(sequelize, DataTypes) {
  var Owner = sequelize.define("Owner", {
    owner_id: {
      type: DataTypes.INTEGER
    },
    owner_first_name: {
      type: DataTypes.STRING
    },
    owner_last_name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true
  });

  return Owner;
}