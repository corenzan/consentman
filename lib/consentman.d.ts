import { Subject, Callback } from "./subject";
import { Consent } from "./consent";
import { Entry } from "./entry";
/**
 * Manages and enforce consent.
 *
 * @export
 * @class Consentman
 */
export declare class Consentman {
    /**
     * Subject registry.
     *
     * @type {Subject[]}
     * @memberof Consentman
     */
    subjects: Subject[];
    /**
     * Active policies.
     *
     * @type {Entry[]}
     * @memberof Consentman
     */
    entries: Entry[];
    /**
     * Restore stored entries.
     *
     * @memberof Consentman
     */
    constructor();
    /**
     * Return current consent entry with a given `name`.
     *
     * @param {string} [name="default"]
     * @returns {Entry}
     * @memberof Consentman
     */
    getConsent(name?: string): Entry;
    /**
     * Update existing entry or create new one and save to storage.
     *
     * @param {string} name
     * @param {Consent} consent
     * @memberof Consentman
     */
    changeConsent(name: string, consent: Consent): void;
    /**
     * Walk over registered subjects and enforce consent rules.
     *
     * @memberof Consentman
     */
    enforceConsent(): void;
    /**
     * Push new module to the registry.
     *
     * @param {string} name
     * @param {Callback} callback
     * @memberof Consentman
     */
    addConsentSubject(name: string, callback: Callback): void;
}
