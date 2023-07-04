"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const ConnectDB_1 = __importDefault(require("./db/ConnectDB"));
const NotFound_1 = __importDefault(require("./errors/NotFound"));
const Auth_1 = require("./routes/Auth");
const Job_1 = require("./routes/Job");
const Authentication_1 = __importDefault(require("./middleware/Authentication"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//- Routes
app.use("/api/v1/auth", Auth_1.router);
app.use("/api/v1/jobs", Authentication_1.default, Job_1.router);
//- Not Found Err
app.use(NotFound_1.default);
const port = process.env.PORT || 3000;
function start() {
    try {
        const URI = process.env.MONGO_URI;
        if (!URI)
            throw new Error('MongoDB URI is not defined');
        (0, ConnectDB_1.default)(URI);
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    }
    catch (error) {
        console.log(error);
    }
}
;
start();
