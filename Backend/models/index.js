import sequelize from "../config/db.js";

// import all models
import User from "./User.js";
import Address from "./Address.js";
import State from "./State.js";
import City from "./City.js";
import Category from "./category.model.js";
import Product from "./product.model.js";
import Watchlist from "./Watchlist.js";
import Cart from "./Cart.js";
import Order from "./Order.js";
import OrderItem from "./OrderItem.js";

const db = {};

db.sequelize = sequelize;
db.User = User;
db.Address = Address;
db.State = State;
db.City = City;
db.Category = Category;
db.Product = Product;
db.Watchlist = Watchlist;
db.Cart = Cart;
db.Order = Order;
db.OrderItem = OrderItem;

// USER → ADDRESS
User.hasMany(Address, { foreignKey: "user_id" });
Address.belongsTo(User, { foreignKey: "user_id" });

// STATE → CITY
State.hasMany(City, { foreignKey: "state_id" });
City.belongsTo(State, { foreignKey: "state_id" });

// STATE → ADDRESS
State.hasMany(Address, { foreignKey: "state_id" });
Address.belongsTo(State, { foreignKey: "state_id" });

// CITY → ADDRESS
City.hasMany(Address, { foreignKey: "city_id" });
Address.belongsTo(City, { foreignKey: "city_id" });

// CATEGORY → PRODUCT
Category.hasMany(Product, { foreignKey: "category_id" });
Product.belongsTo(Category, { foreignKey: "category_id" });

User.hasMany(Watchlist, { foreignKey: "user_id" });
Watchlist.belongsTo(User, { foreignKey: "user_id" });

Product.hasMany(Watchlist, { foreignKey: "product_id" });
Watchlist.belongsTo(Product, { foreignKey: "product_id" });

User.hasMany(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Product.hasMany(Cart, { foreignKey: "product_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });

// USER → ORDERS
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

// ADDRESS → ORDERS
Address.hasMany(Order, { foreignKey: "address_id" });
Order.belongsTo(Address, { foreignKey: "address_id" });

// ORDER → ORDER ITEMS
Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

// PRODUCT → ORDER ITEMS
Product.hasMany(OrderItem, { foreignKey: "product_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

export default db;
