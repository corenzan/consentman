import { State, Subject } from "./subject";
import { Consent } from "./consent";

const subjectMachine: [State, Consent, State][] = [
  [State.Idle, Consent.Granted, State.Allowed],
  [State.Idle, Consent.Revoked, State.Skipped],
  [State.Allowed, Consent.Revoked, State.Blocked],
  [State.Blocked, Consent.Granted, State.Allowed]
];

describe("Subject", () => {
  describe("update()", () => {
    const callback = jest.fn((state: State) => state);
    const subject = new Subject("foo", callback);

    subjectMachine.forEach(([oldState, consent, newState]) => {
      test(`subject is ${oldState} and consent changed to ${consent}`, () => {
        subject.state = oldState;
        subject.update({ name: "entry", date: 1, consent });
        expect(subject.state).toBe(newState);
      });
    });
  });
});
