/* global ko */
function AppViewModel() {
    var self = this;

    this.billAmount = ko.observable(31.32);
    this.tipPercent = ko.observable(20);
    this.roundDirection = ko.observable("up");

    this.tipAmount = ko.computed(function () {
        return refreshValues(self.billAmount(), self.tipPercent(), self.roundDirection());
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
        return refreshValues(self.billAmount(), self.tipPercent(), self.roundDirection());
    };
    
    function refreshValues(billAmount, tipPercent, roundDirection) {
        if (isEmptyOrWhitespace(billAmount)) return;
        if (isEmptyOrWhitespace(tipPercent)) return;
        if (isEmptyOrWhitespace(roundDirection)) return;
        if (roundDirection != "up" && roundDirection != "down") return;
        
        var tipAmount = billAmount * (tipPercent / 100);
        var total = +tipAmount + +billAmount;
        console.debug("round: " + roundDirection);

        var newTip;
        if (roundDirection === "up") {
            var newTotal = Math.ceil(total);
            var diff = newTotal - total;
            newTip = tipAmount + diff;
        } else {
            var newTotal = Math.floor(total);var diff = total - newTotal;
            newTip = tipAmount - diff;
        }

        return newTip.toFixed(2);
    }
    
    function isEmptyOrWhitespace(str){
        var result =  str.toString().trim() === '';
        return result;
    }
}

ko.applyBindings(new AppViewModel());