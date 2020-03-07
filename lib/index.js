"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consentman_1 = require("./consentman");
var consentman_2 = require("./consentman");
exports.Consentman = consentman_2.Consentman;
/**
 * Default instance of Consentman for convenience.
 */
const instance = new consentman_1.Consentman();
/**
 * Push new subject to the registry.
 *
 * @param {string} name
 * @param {Callback} callback
 */
function addConsentSubject(name, callback) {
    instance.addConsentSubject(name, callback);
}
exports.addConsentSubject = addConsentSubject;
/**
 * Return current consent entry with a given `name`.
 *
 * @param {string} [name="default"]
 * @returns {Entry}
 * @memberof Consentman
 */
function getConsent(name) {
    return instance.getConsent(name);
}
exports.getConsent = getConsent;
/**
 * Update existing entry or create new one and save to storage.
 *
 * @param {string} name
 * @param {Consent} consent
 */
function changeConsent(name, answer) {
    instance.changeConsent(name, answer);
}
exports.changeConsent = changeConsent;
/**
 * Walk over registered subjects and enforce consent rules.
 */
function enforceConsent() {
    instance.enforceConsent();
}
exports.enforceConsent = enforceConsent;
exports.default = instance;
