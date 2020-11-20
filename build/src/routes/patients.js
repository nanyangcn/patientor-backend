"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPublicPatient());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.findPatientById(id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.toNewPatient(req.body);
        const addedPatient = patientService_1.default.addNewPatient(newPatient);
        res.json(addedPatient);
    }
    catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        const newEntry = utils_1.toNewEntry(req.body);
        const addedEntry = patientService_1.default.addNewEntry(newEntry, id);
        res.json(addedEntry);
    }
    catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).send(err.message);
    }
});
exports.default = router;
