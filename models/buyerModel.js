// creating Buyer model
// Exporting makes the Buyer Model available for other files.
// This will also create a table when server.js is run.
module.exports = function(sequelize, DataTypes) {
  var Buyer = sequelize.define("Buyer", {
    buyer_id: {
      type: DataTypes.INTEGER
    },
    buyer_first_name: {
      type: DataTypes.STRING
    },
    buyer_last_name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: true
  });


  return Buyer;
}
