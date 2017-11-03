// creating Buyer model
// Exporting makes the Buyer Model available for other files.
// This will also create a table when server.js is run.
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_id: {
      type: DataTypes.INTEGER
    },
    category: {
      type: DataTypes.STRING
    },
    // two options: sale or trade
    // default true = sale
    // false = service
    good_or_service: {
      type: DataTypes.BOOLEAN
    },
    // allow the user to provide good/service for money
    for_cash: {
      type: DataTypes.BOOLEAN
    },
    // allow the user to provide good/service for trade of good
    trade_good: {
      type: DataTypes.BOOLEAN
    },
    // allow the user to provide good/service for trade of service
    trade_service: {
      type: DataTypes.BOOLEAN
    },
    buyer_id: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });

  return Item;
}