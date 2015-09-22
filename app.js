/* global ko */
function Utility() {}
Utility.isEmptyOrWhitespace = function(str) {
        var result =  str.toString().trim() === '';
        return result;
}

Utility.calculateTip = function(billAmount, tipPercent, roundDirection) {
        if (Utility.isEmptyOrWhitespace(billAmount)) return;
        if (Utility.isEmptyOrWhitespace(tipPercent)) return;
        if (Utility.isEmptyOrWhitespace(roundDirection)) return;
        if (roundDirection != "up" && roundDirection != "down") return;
        
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

function AppViewModel() {
    var self = this;

    this.billAmount = ko.observable(31.32);
    this.tipPercent = ko.observable(20);
    this.roundDirection = ko.observable("up");

    this.tipAmount = ko.computed(function () {
        return Utility.calculateTip(self.billAmount(), self.tipPercent(), self.roundDirection());
    }, this);

    this.roundedTotal = ko.computed(function () {
        return (+self.billAmount() + +self.tipAmount()).toFixed(2);
    }, this);
    
    this.actualTipPercent = ko.computed(function () {
        return ((+self.tipAmount() / +self.billAmount()) * 100).toFixed(1);
    }, this);
    
    this.tipToText = ko.computed(function () {
        return self.tipAmount() + " (" + self.actualTipPercent() + "%)";
    });
    
    this.refresh = function () {
        return Utility.calculateTip(self.billAmount(), self.tipPercent(), self.roundDirection());
    };
}

ko.applyBindings(new AppViewModel());