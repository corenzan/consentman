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
      console.log("Consent has been granted!");
      break;

    case "blocked":
      console.log("Consent has been revoked.");
      break;

    default:
      console.log("User need to consent first.");
      break;
  }
});

enforceConsent();

if ("indeterminate" === getConsent("default").consent) {
  if (confirm("Would you like to consent?")) {
    changeConsent("default", "allow");
  } else {
    changeConsent("default", "deny");
  }

  enforceConsent();
}
```

On the user's first visit to the website the `default` consent will be `"indeterminate"`, so a confirmation will be shown asking the user for consent.

If the user clicks `Yes` consent will be given and any modules complying with the `default` consent will get installed.

If the user clicks `No` consent will be denied and any modules complying with the `default` consent will be skipped.

Subsequent visits by the user will **not** trigger the confirmation since consent is remembered across visits (stored in local storage).

If at any time the `default` consent is changed, any modules complying with it will be either installed or removed depending on whether the new consent was set _granted_ or _revoked_ respectively.

You can also have additional policies to use in different modules, e.g. one for trackers, one for advertising, etc.

## API

<details>
  <summary>
    <code>addConsentSubject(name: string, callback: Callback): void</code>
  </summary>
  <p>Push new consent subject to the registry. A consent subject is a state machine that updates whenever <code>enforceConsent</code> is called. The next state depends on whether a consent of same name has been granted or revoked. Possible states are <code>"idle"</code>, <code>"allowed"</code> or <code>"blocked"</code> or <code>"skipped"</code>.</p>
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
    <code>changeConsent(name: string, answer: Consent): void</code>
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
