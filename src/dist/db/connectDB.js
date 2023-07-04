"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
function ConnectDB(url) {
    mongoose_1.default.connect(url).then(() => {
        console.log("Connected to MongoDB");
    }).catch(() => {
        console.log("Error connecting to MongoDB");
    });
    mongoose_1.default.set("autoIndex", false);
    // mongoose.connect(url, { autoIndex: false });
}
exports.default = ConnectDB;
/*
Chat GPT

Yes, there is a difference between setting autoIndex to false in the schema options and setting it in the mongoose.connect() options.

- Setting autoIndex: false in the schema options:
When you define the schema with { autoIndex: false }, it means that Mongoose will not automatically create indexes for the fields defined in the schema. Indexes will only be created if explicitly specified or if Mongoose determines it is necessary (e.g., unique fields). This option is useful if you want to have more control over index creation and optimize performance.

- Setting autoIndex: false in mongoose.connect() options:
When you set autoIndex: false in the mongoose.connect() options, it applies globally to the connection. It means that Mongoose will not automatically create any indexes for any schemas defined within that connection. This option can be used to disable automatic index creation for all schemas in your application.

*/ 
