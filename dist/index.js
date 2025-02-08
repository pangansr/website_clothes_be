"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("cloudinary");
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const purchase_routes_1 = __importDefault(require("./routes/purchase.routes"));
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://192.168.100.114:3000",
    methods: "GET,POST",
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/auth", (req, res) => {
    res.send("ddddddddddddddđ");
});
app.use("/auth", auth_routes_1.default);
app.use("/user", user_routes_1.default);
app.use("/product", product_routes_1.default);
app.use("/cart", cart_routes_1.default);
app.use("/purchase", purchase_routes_1.default);
app.use(errorHandler_1.default);
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dar5mfo5u",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
mongoose_1.default.connect('mongodb+srv://user:123456aA%40@mydb.npp4k.mongodb.net/?retryWrites=true&w=majority&appName=mydb')
    .then(() => {
    console.log('MongoDB connected');
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
});
app.listen(port, () => {
    console.log(`Server is listening to ${port}`);
});
//# sourceMappingURL=index.js.map