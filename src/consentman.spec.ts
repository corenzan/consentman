import { Consentman } from "./consentman";
import { State } from "./subject";

describe("Consentman", () => {
  const consentman = new Consentman();

  test("addConsentSubject()", () => {
    consentman.addConsentSubject("foo", (state: State) => null);
    expect(consentman.subjects.length).toBe(1);
  });
});
