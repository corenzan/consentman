"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subject_1 = require("./subject");
const consent_1 = require("./consent");
const storageKey = "consentman";
/**
 * Retrieve and deserialize previously stored consent entries from local storage.
 *
 * @returns {(Entry[] | null)}
 */
function retrieveStoredEntries() {
    const storedEntries = window.localStorage.getItem(storageKey);
    if (storedEntries) {
        return JSON.parse(storedEntries);
    }
    return null;
}
/**
 * Serialize and save `entries` to local storage.
 *
 * @param {Entry[]} entries
 */
function storeEntries(entries) {
    window.localStorage.setItem(storageKey, JSON.stringify(entries));
}
/**
 * Manages and enforce consent.
 *
 * @export
 * @class Consentman
 */
class Consentman {
    /**
     * Restore stored entries.
     *
     * @memberof Consentman
     */
    constructor() {
        /**
         * Subject registry.
         *
         * @type {Subject[]}
         * @memberof Consentman
         */
        this.subjects = [];
        /**
         * Active policies.
         *
         * @type {Entry[]}
         * @memberof Consentman
         */
        this.entries = [
            {
                name: "default",
                date: Date.now(),
                consent: consent_1.Consent.Indeterminate
            }
        ];
        const storedEntries = retrieveStoredEntries();
        if (storedEntries)
            this.entries = storedEntries;
    }
    /**
     * Return current consent entry with a given `name`.
     *
     * @param {string} [name="default"]
     * @returns {Entry}
     * @memberof Consentman
     */
    getConsent(name = "default") {
        return (this.entries.find(entry => entry.name === name) ||
            this.getConsent("default"));
    }
    /**
     * Update existing entry or create new one and save to storage.
     *
     * @param {string} name
     * @param {Consent} consent
     * @memberof Consentman
     */
    changeConsent(name, consent) {
        const entry = this.getConsent(name);
        if (entry) {
            entry.consent = consent;
            entry.date = Date.now();
        }
        else {
            this.entries.push({
                name,
                date: Date.now(),
                consent
            });
        }
        storeEntries(this.entries);
        this.enforceConsent();
    }
    /**
     * Walk over registered modules and execute active policies.
     *
     * @memberof Consentman
     */
    enforceConsent() {
        this.subjects.forEach(subject => {
            subject.update(this.getConsent(subject.name));
        });
    }
    /**
     * Push new module to the registry.
     *
     * @param {*} { policy, ...callbacks }
     * @memberof Consentman
     */
    addConsentSubject(name, callback) {
        this.subjects.push(new subject_1.Subject(name, callback));
    }
}
exports.Consentman = Consentman;
