import { States, Module } from "./module";
import { Policy } from "./policy";

const moduleMachine: [States, Policy, States][] = [
  [States.Idle, Policy.Allow, States.Installed],
  [States.Idle, Policy.Deny, States.Skipped],
  [States.Installed, Policy.Deny, States.Removed],
  [States.Removed, Policy.Allow, States.Installed]
];

describe("Module", () => {
  describe("update()", () => {
    const module = new Module();

    moduleMachine.forEach(([oldState, policy, newState]) => {
      test(`module is ${oldState} and policy changed to ${policy}`, () => {
        module.state = oldState;
        module.update(policy);
        expect(module.state).toBe(newState);
      });
    });
  });
});
