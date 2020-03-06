import { Module } from "./module";
import { Policy, Policies } from "./policy";

const storageKey = "privacy-police";

/**
 * Retrieve and deserialize previously stored policies from local storage.
 *
 * @returns {(Policies | null)}
 */
function retrieveStoredPolicies(): Policies | null {
  const storedPolicy = window.localStorage.getItem(storageKey);
  if (storedPolicy) {
    return JSON.parse(storedPolicy);
  }
  return null;
}

/**
 * Serialize and save `policies` to local storage.
 *
 * @param {Policies} policies
 */
function storePolicies(policies: Policies): void {
  window.localStorage.setItem(storageKey, JSON.stringify(policies));
}

/**
 * Manages and execute policies.
 *
 * @export
 * @class Police
 */
export class Police {
  /**
   * Modules registry.
   *
   * @type {Module[]}
   * @memberof Police
   */
  modules: Module[] = [];

  /**
   * Active policies.
   *
   * @type {Policies}
   * @memberof Police
   */
  policies: Policies = {
    default: Policy.Undefined
  };

  /**
   * Creates an instance of Police.
   *
   * @memberof Police
   */
  constructor() {
    const storedPolicies = retrieveStoredPolicies();
    if (storedPolicies) this.policies = storedPolicies;
  }

  /**
   * Return current policy for a given `key`.
   *
   * @param {string} [key="default"]
   * @returns {Policy}
   * @memberof Police
   */
  getPolicy(key: string = "default"): Policy {
    return this.policies[key] || this.policies.default;
  }

  /**
   * Update active policies and save to storage.
   *
   * @param {string} key
   * @param {Policy} policy
   * @memberof Police
   */
  setPolicy(key: string, policy: Policy): void {
    this.policies[key] = policy;
    storePolicies(this.policies);
    this.executePolicies();
  }

  /**
   * Walk over registered modules and execute active policies.
   *
   * @memberof Police
   */
  executePolicies(): void {
    this.modules.forEach(module => {
      module.update(this.getPolicy(module.policy));
    });
  }

  /**
   * Push new module to the registry.
   *
   * @param {*} { policy, ...callbacks }
   * @memberof Police
   */
  registerModule({ policy, ...callbacks }: any): void {
    const module = new Module();
    if (policy) module.policy = policy;
    module.callbacks = { ...module.callbacks, ...callbacks };
    this.modules.push(module);
  }
}
