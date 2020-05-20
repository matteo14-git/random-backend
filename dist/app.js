"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const root_1 = __importDefault(require("./root"));
const animals_1 = __importDefault(require("./animals"));
const errorHandler_1 = __importDefault(require("./common/utils/errorHandler"));
const celebrate_1 = require("celebrate");
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(celebrate_1.errors());
app.use(errorHandler_1.default);
app.use('/', root_1.default);
app.use('/animals', animals_1.default);
exports.default = app;
