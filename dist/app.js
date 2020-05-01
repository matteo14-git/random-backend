"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Database_1 = require("./common/utils/Database");
const root_1 = __importDefault(require("./root"));
const app = express_1.default();
app.use('/', root_1.default);
app.listen(3000, (err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err)
        console.log(err);
    console.log('App listening on 3000');
    try {
        yield Database_1.Database.connect();
        console.info('Connected to Mongo!');
    }
    catch (err) {
        console.error('Error connecting to Mongo!', err);
    }
}));
