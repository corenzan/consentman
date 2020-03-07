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

    case "skipped":
      console.log("User need to consent first.");
      break;
  }
});

enforceConsent();

if ("indeterminate" === getConsent("default")) {
  if (prompt("Would you like to consent?")) {
    changeConsent("default", "allow");
  } else {
    changeConsent("default", "deny");
  }
}
```

On the user's first visit to the website the `default` consent will be `"indeterminate"`, so a prompt will be shown asking the user for consent.

If the user clicks `Yes` consent will be given and any modules complying with the `default` consent will get installed.

If the user clicks `No` consent will be denied and any modules complying with the `default` consent will be skipped.

Subsequent visits by the user will **not** trigger the prompt since consent is remembered across visits (stored in local storage).

If at any time the `default` consent is changed, any modules complying with it will be either installed or removed depending on whether the new consent was set _granted_ or _revoked_ respectively.

You can also have additional policies to use in different modules, e.g. one for trackers, one for advertising, etc.

## API

🚧️ ...

## License

This project is licensed under MIT. See [LICENSE.md](LICENSE.md) for full notice.
