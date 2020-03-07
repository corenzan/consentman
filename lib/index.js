"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consentman_1 = require("./consentman");
const singleton = new consentman_1.Consentman();
function addConsentSubject(name, callback) {
    singleton.addConsentSubject(name, callback);
}
exports.addConsentSubject = addConsentSubject;
function getConsent(name) {
    return singleton.getConsent(name);
}
exports.getConsent = getConsent;
function changeConsent(name, answer) {
    singleton.changeConsent(name, answer);
}
exports.changeConsent = changeConsent;
function enforceConsent() {
    singleton.enforceConsent();
}
exports.enforceConsent = enforceConsent;
exports.default = singleton;
