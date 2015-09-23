function Engine() {}
Engine.isEmptyOrWhitespace = function(str) {
        var result =  str.toString().trim() === '';
        return result;
}

Engine.calculateTip = function(billAmount, tipPercent, roundDirection) {
        if (Engine.isEmptyOrWhitespace(billAmount)) return false;
        if (Engine.isEmptyOrWhitespace(tipPercent)) return false;
        if (Engine.isEmptyOrWhitespace(roundDirection)) return false;
        if (roundDirection != "up" && roundDirection != "down") return false;
        
        var tipAmount = billAmount * (tipPercent / 100);
        var total = +tipAmount + +billAmount;
        console.debug("round: " + roundDirection);

        var newTotal, diff, newTip;
        if (roundDirection === "up") {
            newTotal = Math.ceil(total);
            diff = newTotal - total;
            newTip = tipAmount + diff;
        } else {
            newTotal = Math.floor(total);
            diff = total - newTotal;
            newTip = tipAmount - diff;
        }

        return newTip.toFixed(2);
}