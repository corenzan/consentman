import { Subject, Callback } from "./subject";
import { Consent } from "./consent";
import { Entry } from "./entry";

const storageKey = "consentman";

/**
 * Retrieve and deserialize previously stored consent entries from local storage.
 *
 * @returns {(Entry[] | null)}
 */
function retrieveStoredEntries(): Entry[] | null {
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
function storeEntries(entries: Entry[]): void {
  window.localStorage.setItem(storageKey, JSON.stringify(entries));
}

/**
 * Manages and enforce consent.
 *
 * @export
 * @class Consentman
 */
export class Consentman {
  /**
   * Subject registry.
   *
   * @type {Subject[]}
   * @memberof Consentman
   */
  subjects: Subject[] = [];

  /**
   * Active policies.
   *
   * @type {Entry[]}
   * @memberof Consentman
   */
  entries: Entry[] = [
    {
      name: "default",
      date: Date.now(),
      consent: Consent.Indeterminate
    }
  ];

  /**
   * Restore stored entries.
   *
   * @memberof Consentman
   */
  constructor() {
    const storedEntries = retrieveStoredEntries();
    if (storedEntries) this.entries = storedEntries;
  }

  /**
   * Return current consent entry with a given `name`.
   *
   * @param {string} [name="default"]
   * @returns {Entry}
   * @memberof Consentman
   */
  getConsent(name: string = "default"): Entry {
    return (
      this.entries.find(entry => entry.name === name) ||
      this.getConsent("default")
    );
  }

  /**
   * Update existing entry or create new one and save to storage.
   *
   * @param {string} name
   * @param {Consent} consent
   * @memberof Consentman
   */
  changeConsent(name: string, consent: Consent): void {
    const entry = this.getConsent(name);

    if (entry) {
      entry.consent = consent;
      entry.date = Date.now();
    } else {
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
   * Walk over registered subjects and enforce consent rules.
   *
   * @memberof Consentman
   */
  enforceConsent(): void {
    this.subjects.forEach(subject => {
      subject.update(this.getConsent(subject.name));
    });
  }

  /**
   * Push new module to the registry.
   *
   * @param {string} name
   * @param {Callback} callback
   * @memberof Consentman
   */
  addConsentSubject(name: string, callback: Callback): void {
    this.subjects.push(new Subject(name, callback));
  }
}
