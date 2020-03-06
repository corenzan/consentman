import { Module } from "./module";
import { Policy, Policies } from "./policy";
/**
 * Manages and execute policies.
 *
 * @export
 * @class Police
 */
export declare class Police {
    /**
     * Modules registry.
     *
     * @type {Module[]}
     * @memberof Police
     */
    modules: Module[];
    /**
     * Active policies.
     *
     * @type {Policies}
     * @memberof Police
     */
    policies: Policies;
    /**
     * Creates an instance of Police.
     *
     * @memberof Police
     */
    constructor();
    /**
     * Return current policy for a given `key`.
     *
     * @param {string} [key="default"]
     * @returns {Policy}
     * @memberof Police
     */
    getPolicy(key?: string): Policy;
    /**
     * Update active policies and save to storage.
     *
     * @param {string} key
     * @param {Policy} policy
     * @memberof Police
     */
    setPolicy(key: string, policy: Policy): void;
    /**
     * Walk over registered modules and execute active policies.
     *
     * @memberof Police
     */
    executePolicies(): void;
    /**
     * Push new module to the registry.
     *
     * @param {*} { policy, ...callbacks }
     * @memberof Police
     */
    registerModule({ policy, ...callbacks }: any): void;
}
