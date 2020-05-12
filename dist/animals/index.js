"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createAnimal_1 = __importDefault(require("./middlewares/createAnimal"));
const router = express_1.Router();
router.get('/', (req, res) => {
    res.send({ text: 'Animals here!' });
});
// router.post('/', celebrate(createAnimalSchema), createAnimal);
router.post('/', createAnimal_1.default);
exports.default = router;
