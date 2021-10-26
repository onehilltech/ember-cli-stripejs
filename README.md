ember-cli-stripejs
==============================================================================

An add-on for integrating Stripe into your EmberJS application.

Installation
------------------------------------------------------------------------------

```
ember install @onehilltech/ember-cli-stripejs
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Using with Corber / Cordova
------------------------------------------------------------------------------

If you are using any of the Stripe element component in a Corber (or Cordova) 
application, then you must allow navigation the Stripe. Otherwise, the Stripe
element components will not load correctly.

```xml
<allow-navigation href="https://js.stripe.com/*" />
```
