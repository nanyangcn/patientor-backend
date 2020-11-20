"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default;
};
const getPublicPatient = () => {
    return patients_1.default.map((patient) => ({
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
    }));
};
const findPatientById = (id) => {
    return patients_1.default.find((patient) => patient.id === id);
};
const addNewPatient = (patient) => {
    const newPatient = Object.assign(Object.assign({}, patient), { id: uuid_1.v1() });
    patients_1.default.push(newPatient);
    return newPatient;
};
const addNewEntry = (entry, id) => {
    const newEntry = Object.assign(Object.assign({}, entry), { id: uuid_1.v1() });
    const patient = patients_1.default.find((patient) => patient.id === id);
    if (!patient) {
        throw new Error(`patient not found by id: ${id}`);
    }
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    getPublicPatient,
    findPatientById,
    addNewPatient,
    addNewEntry,
};
