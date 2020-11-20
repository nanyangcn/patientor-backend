"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const isEntry = (entries) => {
    return Array.isArray(entries);
};
const isEntryType = (type) => {
    return Object.values(types_1.EntryType).includes(type);
};
const isDiagnosisCodes = (diagnosisCodes) => {
    return diagnosisCodes.every((diagnosis) => typeof diagnosis === 'string');
};
const isHealthCheckRating = (healthCheckRating) => {
    return Object.values(types_1.HealthCheckRating).includes(healthCheckRating);
};
const isDischarge = (discharge) => {
    if (!discharge.date ||
        !isDate(discharge.date) ||
        !discharge.criteria ||
        !isString(discharge.criteria)) {
        return false;
    }
    return true;
};
const isSickLeave = (sickLeave) => {
    if (!sickLeave.startDate ||
        !isDate(sickLeave.startDate) ||
        !sickLeave.endDate ||
        !isDate(sickLeave.endDate)) {
        return false;
    }
    return true;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing name: ${JSON.stringify(name)}`);
    }
    return name;
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing dateOfBirth: ${JSON.stringify(date)}`);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing ssn: ${JSON.stringify(ssn)}`);
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing gender: ${JSON.stringify(gender)}`);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing occupation: ${JSON.stringify(occupation)}`);
    }
    return occupation;
};
const parseEntries = (entries) => {
    if (!entries) {
        return [];
    }
    if (!isEntry(entries)) {
        throw new Error(`Incorrect or missing entries: ${JSON.stringify(entries)}`);
    }
    return entries;
};
const parseType = (type) => {
    if (!type || !isEntryType(type)) {
        throw new Error(`Incorrect or missing entry:type : ${JSON.stringify(type)}`);
    }
    return type;
};
const parseDescription = (description) => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect or missing description: ${JSON.stringify(description)}`);
    }
    return description;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Incorrect or missing date: ${JSON.stringify(date)}`);
    }
    return date;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect or missing specialist: ${JSON.stringify(specialist)}`);
    }
    return specialist;
};
const parseDiagnosisCodes = (diagnosisCodes) => {
    if (!diagnosisCodes) {
        return [];
    }
    if (!Array.isArray(diagnosisCodes) || !isDiagnosisCodes(diagnosisCodes)) {
        throw new Error(`Incorrect diagnosisCodes: ${JSON.stringify(diagnosisCodes)}`);
    }
    return diagnosisCodes;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (healthCheckRating === undefined ||
        !isHealthCheckRating(healthCheckRating)) {
        throw new Error(`Incorrect or missing healthCheckRating: ${JSON.stringify(healthCheckRating)}`);
    }
    return healthCheckRating;
};
const parseDischarge = (discharge) => {
    if (!discharge || !isDischarge(discharge)) {
        throw new Error(`Incorrect or missing discharge: ${JSON.stringify(discharge)}`);
    }
    return discharge;
};
const parseEmployerName = (employerName) => {
    if (!employerName || !isString(employerName)) {
        throw new Error(`Incorrect or missing employerName: ${JSON.stringify(employerName)}`);
    }
    return employerName;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave) {
        return undefined;
    }
    if (!isSickLeave(sickLeave)) {
        throw new Error(`Incorrect sickLeave: ${JSON.stringify(sickLeave)}`);
    }
    return sickLeave;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object) => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries),
    };
};
exports.toNewPatient = toNewPatient;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewEntry = (object) => {
    const type = parseType(object.type);
    const entry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
    switch (type) {
        case 'HealthCheck':
            return Object.assign(Object.assign({}, entry), { type: 'HealthCheck', healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
        case 'Hospital':
            return Object.assign(Object.assign({}, entry), { type: 'Hospital', discharge: parseDischarge(object.discharge) });
        case 'OccupationalHealthcare':
            return Object.assign(Object.assign({}, entry), { type: 'OccupationalHealthcare', employerName: parseEmployerName(object.employerName), sickLeave: parseSickLeave(object.sickLeave) });
        default:
            throw new Error(`Incorrect or missing entry:type : ${JSON.stringify(type)}`);
    }
};
exports.toNewEntry = toNewEntry;
