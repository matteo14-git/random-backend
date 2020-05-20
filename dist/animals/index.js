"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const createAnimal_1 = __importDefault(require("./middlewares/createAnimal"));
const createAnimal_schema_1 = __importDefault(require("./schemas/createAnimal.schema"));
const updateAnimal_1 = __importDefault(require("./middlewares/updateAnimal"));
const deleteAnimal_1 = __importDefault(require("./middlewares/deleteAnimal"));
const getAnimalList_1 = __importDefault(require("./middlewares/getAnimalList"));
const router = express_1.Router();
router.get('/', getAnimalList_1.default);
router.post('/', celebrate_1.celebrate(createAnimal_schema_1.default), createAnimal_1.default);
router.put('/:animalId', updateAnimal_1.default);
router.delete('/:animalId', deleteAnimal_1.default);
exports.default = router;
