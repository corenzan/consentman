"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("./module");
const policy_1 = require("./policy");
const storageKey = "privacy-police";
/**
 * Retrieve and deserialize previously stored policies from local storage.
 *
 * @returns {(Policies | null)}
 */
function retrieveStoredPolicies() {
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
function storePolicies(policies) {
    window.localStorage.setItem(storageKey, JSON.stringify(policies));
}
/**
 * Manages and execute policies.
 *
 * @export
 * @class Police
 */
class Police {
    /**
     * Creates an instance of Police.
     *
     * @memberof Police
     */
    constructor() {
        /**
         * Modules registry.
         *
         * @type {Module[]}
         * @memberof Police
         */
        this.modules = [];
        /**
         * Active policies.
         *
         * @type {Policies}
         * @memberof Police
         */
        this.policies = {
            default: policy_1.Policy.Undefined
        };
        const storedPolicies = retrieveStoredPolicies();
        if (storedPolicies)
            this.policies = storedPolicies;
    }
    /**
     * Return current policy for a given `key`.
     *
     * @param {string} [key="default"]
     * @returns {Policy}
     * @memberof Police
     */
    getPolicy(key = "default") {
        return this.policies[key] || this.policies.default;
    }
    /**
     * Update active policies and save to storage.
     *
     * @param {string} key
     * @param {Policy} policy
     * @memberof Police
     */
    setPolicy(key, policy) {
        this.policies[key] = policy;
        storePolicies(this.policies);
        this.executePolicies();
    }
    /**
     * Walk over registered modules and execute active policies.
     *
     * @memberof Police
     */
    executePolicies() {
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
    registerModule(_a) {
        var { policy } = _a, callbacks = __rest(_a, ["policy"]);
        const module = new module_1.Module();
        if (policy)
            module.policy = policy;
        module.callbacks = Object.assign(Object.assign({}, module.callbacks), callbacks);
        this.modules.push(module);
    }
}
exports.Police = Police;
