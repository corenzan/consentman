import { Consentman } from "./consentman";
import { Entry } from "./entry";
import { Consent } from "./consent";
import { Callback } from "./subject";

export { Consentman } from "./consentman";

/**
 * Default instance of Consentman for convenience.
 */
const instance = new Consentman();

/**
 * Push new subject to the registry.
 *
 * @param {string} name
 * @param {Callback} callback
 */
export function addConsentSubject(name: string, callback: Callback): void {
  instance.addConsentSubject(name, callback);
}

/**
 * Return current consent entry with a given `name`.
 *
 * @param {string} [name="default"]
 * @returns {Entry}
 * @memberof Consentman
 */
export function getConsent(name: string): Entry {
  return instance.getConsent(name);
}

/**
 * Update existing entry or create new one and save to storage.
 *
 * @param {string} name
 * @param {Consent} consent
 */
export function changeConsent(name: string, answer: Consent): void {
  instance.changeConsent(name, answer);
}

/**
 * Walk over registered subjects and enforce consent rules.
 */
export function enforceConsent(): void {
  instance.enforceConsent();
}

export default instance;
