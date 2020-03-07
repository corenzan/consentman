"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consent_1 = require("./consent");
var State;
(function (State) {
    State["Idle"] = "idle";
    State["Allowed"] = "allowed";
    State["Skipped"] = "skipped";
    State["Blocked"] = "blocked";
})(State = exports.State || (exports.State = {}));
class Subject {
    constructor(name, callback) {
        this.name = "default";
        this.state = State.Idle;
        this.callback = (state) => null;
        this.name = name;
        this.callback = callback;
    }
    update(entry) {
        switch (this.state) {
            case State.Idle:
                if (entry.consent === consent_1.Consent.Granted) {
                    this.state = State.Allowed;
                }
                else {
                    this.state = State.Skipped;
                }
                break;
            case State.Allowed:
                if (entry.consent === consent_1.Consent.Revoked) {
                    this.state = State.Blocked;
                }
                break;
            case State.Skipped:
                if (entry.consent === consent_1.Consent.Granted) {
                    this.state = State.Allowed;
                }
                break;
            case State.Blocked:
                if (entry.consent === consent_1.Consent.Granted) {
                    this.state = State.Allowed;
                }
                break;
        }
        this.callback(this.state);
    }
}
exports.Subject = Subject;
