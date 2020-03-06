import { Policy, Policies } from "./policy";

export enum States {
  Idle = "idle",
  Installed = "installed",
  Skipped = "skipped",
  Removed = "removed"
}

export class Module {
  policy: string = "default";

  state: States = States.Idle;

  callbacks = {
    install: () => null,
    remove: () => null,
    skip: () => null
  };

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

  update(policy: Policy) {
    switch (this.state) {
      case States.Idle:
        if (policy === Policy.Allow) {
          this.install();
        } else {
          this.skip();
        }
        break;
      case States.Installed:
        if (policy === Policy.Deny) {
          this.remove();
        }
        break;
      case States.Skipped:
        if (policy === Policy.Allow) {
          this.install();
        }
        break;
      case States.Removed:
        if (policy === Policy.Allow) {
          this.install();
        }
        break;
    }
  }
}
