// creating Item model
// Exporting makes the Item Model available for other files.
// This will also create a table when server.js is run.
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    item_name: {
      type: DataTypes.STRING,
      allowNull: false
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
    },
    created_at: {
      type: DataTypes.DATE,
      default: 'YYYY-MM-DD HH:mm:SS',
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
    }
  }, {
    timestamps: true
  });

  Item.associate = function(models) {
    // We're saying that an Item should belong to a User
    // An Item can't be created without a User due to the foreign key constraint
    // This is targetting the primary key in the User model.
    // The primary key in User is "user_id"
    Item.belongsTo(models.User, {
      foreignKey: "owner_id",   // adds "owner_id" to Item model
      targetKey: "user_id",     // referencing "user_id" in User model
      allowNull: false
    });
  };


  return Item;
}