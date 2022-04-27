# Tip Calculator

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
You can view the tests by visiting https://parkrrr.github.io/tip-calculator/tests/index.html

The automated tests can be run with Grunt:
```
npm install
grunt test
```