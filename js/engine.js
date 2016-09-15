function Engine() {}
Engine.isEmptyOrWhitespace = function(str) {
        if (!str) return false;
        var result =  str.toString().trim() === '';
        return result;
}

Engine.calculateTip = function(billAmount, tipPercent, roundDirection) {
        if (Engine.isEmptyOrWhitespace(billAmount)) return false;
        if (Engine.isEmptyOrWhitespace(tipPercent)) return false;
        if (Engine.isEmptyOrWhitespace(roundDirection)) return false;
        if (roundDirection != "up" &&
            roundDirection != "down" &&
            roundDirection != "none") return false;

        if (tipPercent === "0") return 0;
        if (billAmount < 0) billAmount = 0;

        var tipAmount = billAmount * (tipPercent / 100);
        var total = +tipAmount + +billAmount;

        var newTotal, diff, newTip;
        if (roundDirection === "up") {
            newTotal = Math.ceil(total);
            diff = newTotal - total;
            newTip = tipAmount + diff;
        } else if (roundDirection === "down") {
            newTotal = Math.floor(total);
            diff = total - newTotal;
            newTip = tipAmount - diff;
        } else {
            newTip = tipAmount;
        }

        if (newTip < 0) newTip = 0;

        return +newTip.toFixed(2);
}
