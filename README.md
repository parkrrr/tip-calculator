# Tip Calculator
[![Tests](https://github.com/parkrrr/tip-calculator/actions/workflows/node.js.yml/badge.svg?branch=master&event=schedule)](https://github.com/parkrrr/tip-calculator/actions/workflows/node.js.yml)


# About
I originally wrote this as an exercise to learn automated unit testing in JavaScript. I started using it regularly on my phone so now it's a pet project. It has a very limited scope of functionality but I try to make that experience as easy and as intuitive as possible.

# Usage
Load https://parkrrr.github.io/tip-calculator/ into your mobile browser of choice. The design is responsive so it will work in a desktop environment as well, but the design is tailored for mobile usage.

## Inputs
* **Bill amount** specifies how much your pre-tip cost is.
* **Tip** specifies the percentage of the bill to use as a tip.
* **Round** indicates the direction when rounding the total cost.

## Outputs
* **Tip amount** indicates the cost of the tip. The actual percentage of the total cost is shown in parentheses.
* **Total** indicates the bill amount plus tip amount.

# Tests
This project has unit tests and integration tests.

## Unit tests
The unit tests verify the functionality of the business logic and its utility functions.

* The unit test results can be found in the [Actions](https://github.com/parkrrr/tip-calculator/actions) tab under the **Unit Tests** job

## Integration tests
The integration tests verify proper behavior of the UI.

* The integration tests can only be found in the [Actions](https://github.com/parkrrr/tip-calculator/actions) tab.
* The integration tests utilize [Puppeteer](https://github.com/puppeteer/puppeteer) to test the UI.
* Tests are run in Chrome and Firefox.



## Running tests
The unit tests can be run with Grunt:
```
npm install
npm run unit_test
```

The integration tests can also be run with Grunt, but only oen browser can be tested at a time. The `node_modules` directory must be deleted before switching browsers.

### Chrome

```
npm install
npm run ui_test
```

### Firefox
```
PUPPETEER_PRODUCT=firefox
npm install
npm run ui_test
```
