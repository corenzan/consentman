import { Consent } from "./consent";
import { Entry } from "./entry";

export enum State {
  Idle = "idle",
  Allowed = "allowed",
  Skipped = "skipped",
  Blocked = "blocked"
}

export type Callback = (state: State) => void;

export class Subject {
  name: string = "default";

  state: State = State.Idle;

  callback: Callback = (state: State) => null;

  constructor(name: string, callback: Callback) {
    this.name = name;
    this.callback = callback;
  }

  update(entry: Entry) {
    switch (this.state) {
      case State.Idle:
        if (entry.consent === Consent.Granted) {
          this.state = State.Allowed;
        } else {
          this.state = State.Skipped;
        }
        break;
      case State.Allowed:
        if (entry.consent === Consent.Revoked) {
          this.state = State.Blocked;
        }
        break;
      case State.Skipped:
        if (entry.consent === Consent.Granted) {
          this.state = State.Allowed;
        }
        break;
      case State.Blocked:
        if (entry.consent === Consent.Granted) {
          this.state = State.Allowed;
        }
        break;
    }
    this.callback(this.state);
  }
}
