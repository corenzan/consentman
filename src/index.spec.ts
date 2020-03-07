import consentman, {
  addConsentSubject,
  getConsent,
  changeConsent,
  enforceConsent
} from "./index";

import { State } from "./subject";
import { Consent } from "./consent";

describe("Consentman", () => {
  const callback = jest.fn((state: State) => state);

  test("addConsentSubject()", () => {
    addConsentSubject("default", callback);
    expect(consentman.subjects[0].name).toBe("default");
    expect(consentman.subjects[0].state).toBe(State.Idle);
  });

  test("getConsent()", () => {
    const entry = getConsent("default");
    expect(entry.name).toBe("default");
    expect(entry.consent).toBe(Consent.Indeterminate);
  });

  test("changeConsent()", () => {
    const entry = getConsent("default");
    changeConsent("default", Consent.Granted);
    expect(entry.consent).toBe(Consent.Granted);
    changeConsent("default", Consent.Revoked);
    expect(entry.consent).toBe(Consent.Revoked);
  });

  test("enforceConsent()", () => {
    expect(getConsent("default").consent).toBe(Consent.Revoked);

    enforceConsent();
    expect(callback.mock.results[0].value).toBe(State.Skipped);

    changeConsent("default", Consent.Granted);
    enforceConsent();
    expect(callback.mock.results[1].value).toBe(State.Allowed);

    changeConsent("default", Consent.Revoked);
    enforceConsent();
    expect(callback.mock.results[2].value).toBe(State.Blocked);
  });
});
