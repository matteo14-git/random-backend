"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const root_1 = __importDefault(require("./root"));
const animals_1 = __importDefault(require("./animals"));
const app = express_1.default();
app.use('/', root_1.default);
app.use('/animals', animals_1.default);
exports.default = app;
