import { Consentman } from "./consentman";
import { Entry } from "./entry";
import { Consent } from "./consent";
import { Callback } from "./subject";
export { Consentman } from "./consentman";
/**
 * Default instance of Consentman for convenience.
 */
declare const instance: Consentman;
/**
 * Push new subject to the registry.
 *
 * @param {string} name
 * @param {Callback} callback
 */
export declare function addConsentSubject(name: string, callback: Callback): void;
/**
 * Return current consent entry with a given `name`.
 *
 * @param {string} [name="default"]
 * @returns {Entry}
 * @memberof Consentman
 */
export declare function getConsent(name: string): Entry;
/**
 * Update existing entry or create new one and save to storage.
 *
 * @param {string} name
 * @param {Consent} consent
 */
export declare function changeConsent(name: string, answer: Consent): void;
/**
 * Walk over registered subjects and enforce consent rules.
 */
export declare function enforceConsent(): void;
export default instance;
