/* global Engine */
QUnit.test("isNullOrWhitespace", function(assert) {
    assert.ok(Engine.isEmptyOrWhitespace(""), "Empty string is considered empty");
    assert.ok(Engine.isEmptyOrWhitespace(" "), "Space character is considered empty");
    assert.ok(Engine.isEmptyOrWhitespace("  "), "Tab character is considered empty");
    assert.ok(Engine.isEmptyOrWhitespace("     "), "Multiple spaces is considered empty");
    assert.notOk(Engine.isEmptyOrWhitespace("Cat"), "Non-empty string spaces is considered non-empty");
    assert.notOk(Engine.isEmptyOrWhitespace(" Cat"), "String with leading spaces is considered non-empty");
    assert.notOk(Engine.isEmptyOrWhitespace("Cat "), "String with trailing spaces is considered non-empty");
    assert.notOk(Engine.isEmptyOrWhitespace(undefined), "Undefined string is not considered empty");
});

QUnit.test("isNumeric", function(assert) {
    assert.ok(Engine.isNumeric(0), "Zero");
    assert.ok(Engine.isNumeric("0"), "Zero as string");
    assert.ok(Engine.isNumeric(0.0), "Zero with decimal");
    assert.notOk(Engine.isNumeric("abc"), "Text");
    assert.notOk(Engine.isNumeric("\n"), "Escape characters");
    assert.ok(Engine.isNumeric("10e1"), "Scientific notation");
    assert.ok(Engine.isNumeric(-1), "Negatives");
    assert.notOk(Engine.isNumeric("127.0.0.1"), "IP address");
    assert.ok(Engine.isNumeric(0xFFFFFF), "Hex");
});

QUnit.test("calculateTip input validation", function(assert) {
    assert.notOk(Engine.calculateTip("", "", ""), "Empty billing amount returns false");
    assert.notOk(Engine.calculateTip("0.00", " ", " "), "Empty tip percent returns false");
    assert.notOk(Engine.calculateTip("0.00", "20", " "), "Empty rounding direction returns false");
    assert.notOk(Engine.calculateTip("0.00", "20", "sideways"), "Invalid rounding direction returns false");
    assert.ok(Engine.calculateTip("0.00", "20", "up") !== "false", "Valid parameters returns not-false");
    assert.equal(Engine.calculateTip("-1.00", "20", "up"), 0, "Negative bill amount sets bill amount to 0");
});

QUnit.test("calculateTip algorithm", function(assert) {
    assert.equal(Engine.calculateTip("10", "20", "up"), 2, "$10 * 20% Up = 2.00");
    assert.equal(Engine.calculateTip("10", "20", "down"), 2, "$10 * 20% Down = 2.00");

    assert.equal(Engine.calculateTip("10", "10", "up"), 1, "$10 * 10% Up = 1.00");
    assert.equal(Engine.calculateTip("10", "10", "down"), 1, "$10 * 10% Down = 1.00");

    assert.equal(Engine.calculateTip("10", "18", "up"), 2, "$10 * 18% Up = 2.00");
    assert.equal(Engine.calculateTip("10", "18", "down"), 1, "$10 * 18% Down = 1.00");
    assert.equal(Engine.calculateTip("10", "18", "none"), 1.8, "$10 * 18% None = 1.80");

    assert.equal(Engine.calculateTip("0.0", "20", "up"), 0, "$0 * 20% Up = 0.00");
    assert.equal(Engine.calculateTip("0.0", "20", "down"), 0, "$0 * 20% Down = 0.00");
    assert.equal(Engine.calculateTip("0.0", "20", "none"), 0, "$0 * 20% None = 0.00");

    assert.equal(Engine.calculateTip("10.0", "0", "up"), 0, "$10 * 0% Up = 0.00");
    assert.equal(Engine.calculateTip("10.0", "0", "down"), 0, "$10 * 0% Down = 0.00");
});
