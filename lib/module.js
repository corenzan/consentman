"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const policy_1 = require("./policy");
var States;
(function (States) {
    States["Idle"] = "idle";
    States["Installed"] = "installed";
    States["Skipped"] = "skipped";
    States["Removed"] = "removed";
})(States = exports.States || (exports.States = {}));
class Module {
    constructor() {
        this.policy = "default";
        this.state = States.Idle;
        this.callbacks = {
            install: () => null,
            remove: () => null,
            skip: () => null
        };
    }
    install() {
        this.state = States.Installed;
        this.callbacks.install();
    }
    remove() {
        this.state = States.Removed;
        this.callbacks.remove();
    }
    skip() {
        this.state = States.Skipped;
        this.callbacks.skip();
    }
    update(policy) {
        switch (this.state) {
            case States.Idle:
                if (policy === policy_1.Policy.Allow) {
                    this.install();
                }
                else {
                    this.skip();
                }
                break;
            case States.Installed:
                if (policy === policy_1.Policy.Deny) {
                    this.remove();
                }
                break;
            case States.Skipped:
                if (policy === policy_1.Policy.Allow) {
                    this.install();
                }
                break;
            case States.Removed:
                if (policy === policy_1.Policy.Allow) {
                    this.install();
                }
                break;
        }
    }
}
exports.Module = Module;
