// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/config.json");

// Creates a "Item" model that matches up with DB
var Item = sequelize.define("Item", {
  item_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  owner_id: {
    type: Sequelize.INTEGER
  },
  catergory: {
    type: Sequelize.STRING
  },
  // two options: sale or trade
  // default true = sale
  // false = service
  good_or_service: {
    type: Sequelize.BOOLEAN
  },
  // allow the user to provide good/service for money
  for_cash: {
    type: Sequelize.BOOLEAN
  },
  // allow the user to provide good/service for trade of good
  trade_good: {
    type: Sequelize.BOOLEAN
  },
  // allow the user to provide good/service for trade of service
  trade_service: {
    type: Sequelize.BOOLEAN
  },
  buyer_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: true
});

// Syncs with DB
Item.sync();


// Creates a "Owner" model that matches up with DB
var Owner = sequelize.define("Owner", {
  owner_id: {
    type: Sequelize.INTEGER
  },
  owner_first_name: {
    type: Sequelize.STRING
  },
  owner_last_name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true
});

// Syncs with DB
Owner.sync();


// Creates a "Buyer" model that matches up with DB
var Buyer = sequelize.define("Buyer", {
  buyer_id: {
    type: Sequelize.INTEGER
  },
  buyer_first_name: {
    type: Sequelize.STRING
  },
  buyer_last_name: {
    type: Sequelize.STRING
  }
}, {
  timestamps: true
});

// Syncs with DB
Buyer.sync();


// Makes the Item, Owner, and Buyer Models available for other files.
// This will also create a table when server.js is run.
module.exports = {
  Item: Item,
  Owner: Owner,
  Buyer: Buyer
}