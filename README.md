![GitHub Workflow Status](https://img.shields.io/github/workflow/status/corenzan/consentman/Default)
![npm](https://img.shields.io/npm/dm/consentman)

---

# Consentman

> A lightweight manager for complying with your website users' consent.

**Consentman** provides an API for setting, changing and storing user consent and handling the event of consent being given or revoked.

Differently from other similar projects it will **not** provide any user interface or automatically meddle third-party libraries.

## Usage

At a glance:

```js
import {
  addConsentSubject,
  getConsent,
  changeConsent,
  enforceConsent
} from "consentman";

addConsentSubject("default", state => {
  switch (state) {
    case "allowed":
      console.log("Consent has been granted. Installing trackers.");
      break;

    case "blocked":
      console.log("Consent has been revoked. Removing trackers.");
      break;

    default:
      console.log("User needs to consent first.");
      break;
  }
});

enforceConsent();

if ("indeterminate" === getConsent("default").consent) {
  if (confirm("Would you like to consent?")) {
    changeConsent("default", "granted");
  } else {
    changeConsent("default", "revoked");
  }

  enforceConsent();
}
```

On the user's first visit to the website the consent named `default` will be `indeterminate`, so a confirmation will be shown asking the user for consent.

If the user clicks `Yes` consent will be granted and any subjects will get allowed.

If the user clicks `No` consent will be revoked and any subjects will be skipped.

Subsequent visits by the user will **not** trigger the confirmation since consent is remembered across visits--stored in local storage.

If at any time `default` consent is revoked and re-enforced, any subjects will be blocked.

You can also have additional consents with different names, e.g. one for trackers, one for advertising, etc.

## API

<details>
  <summary>
    <code>addConsentSubject(name: string, callback: (state: "idle" | "allowed" | "blocked" | "skipped") => void): void</code>
  </summary>
  <p>Push new consent subject to the registry. A consent subject is a state machine that updates whenever <code>enforceConsent</code> is called. The next state depends on whether a consent of same name has been granted or revoked. Possible states are <code>"idle"</code>, <code>"allowed"</code>, <code>"blocked"</code> or <code>"skipped"</code>.</p>
</details>

<details>
  <summary>
    <code>getConsent(name: string): Entry</code>
  </summary>
  <p>Return current consent entry with a given <code>name</code>. A consent entry has the following interface:</p>
  <dl>
    <dt>name</dt>
    <dd>A string identifier.</dd>
    <dt>date</dt>
    <dd>Timestamp for when consent was last changed.</dd>
    <dt>consent</dt>
    <dd>The current consent policy. Either <code>"indeterminate"</code>, <code>"granted"</code> or <code>"revoked"</code>.</dd>
  </dl>
</details>

<details>
  <summary>
    <code>changeConsent(name: string, consent: "indeterminate" | "granted" | "revoked"): void</code>
  </summary>
  <p>Update existing consent entry or create new one and save to storage.</p>
</details>

<details>
  <summary>
    <code>enforceConsent(): void</code>
  </summary>
  <p>Walk over registered consent subjects and update their states.</p>
</details>

## License

This project is licensed under MIT. See [LICENSE.md](LICENSE.md) for full notice.
