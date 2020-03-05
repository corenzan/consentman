# Privacy Police 🚨️

> ...

**Privacy Police** is a lightweight engine for managing and complying with your website's users consent policy.

## About

**Privacy Police** will:

1. Provide an easy API for setting, changing and remembering each user's consent policy.
2. Run, skip or rollback modules according to the chosen policy.

But it won't:

1. Provide any dialogs, buttons or pop-ups.
2. Automatically block or otherwise meddle with trackers or third-party libraries.

## Usage

At a glance:

```js
import { getPolicy, setPolicy, registerModule } from "privacy-police";

registerModule({
  install() {
    console.log("Consent has been granted!");
  }

  remove() {
    console.log("Consent has been revoked.");
  }
});

if (undefined === getPolicy("default")) {
  if (prompt("Would you like to consent?")) {
    setPolicy("default", "allow");
  } else {
    setPolicy("default", "deny");
  }
}
```

On the user's first visit to the website the `default` policy will be undefined, so a prompt will be shown asking the user for consent.

If the user clicks `Yes` consent will be given and any modules complying with the `default` policy will get installed--and the `install()` hook will run.

If the user clicks `No` consent will be denied and any modules complying with the `default` policy will be skipped.

Subsequent visits by the user will **not** trigger the prompt since consent is remembered (stored in local storage).

If at any time the `default` policy gets changed, any modules complying with it will be either installed or removed depending on whether the new policy is set to `"allow"` or `"deny"` respectively.

You can also have additional policies to use with different modules, e.g. one for trackers, one for advertising, etc.

## API

🚧️ ...

## License

This project is licensed under MIT. See [LICENSE.md](LICENSE.md) for full notice.
