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
require("./common/utils/loadenv");
const app_1 = __importDefault(require("./app"));
const Database_1 = require("./common/utils/Database");
const { SERVER_PORT } = process.env;
app_1.default.listen(SERVER_PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('App listening on 4000');
    try {
        yield Database_1.Database.connect();
        console.info('Connected to Mongo!');
    }
    catch (err) {
        console.error('Error connecting to Mongo!', err);
    }
}));
