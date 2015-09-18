function AppViewModel() {
    var self = this;

    this.billAmount = ko.observable(31.32);
    this.tipPercent = ko.observable(20);
    this.roundDirection = ko.observable("up");

    this.tipAmount = ko.computed(function () {
        var tipAmount = self.billAmount() * (self.tipPercent() / 100);
        var total = +tipAmount + +self.billAmount();
        console.debug("round: " + this.roundDirection());

        var newTip;
        if (self.roundDirection() === "up") {
            var newTotal = Math.ceil(total);
            var diff = newTotal - total;
            newTip = tipAmount + diff;
        } else {
            var newTotal = Math.floor(total);
            var diff = total - newTotal;
            newTip = tipAmount - diff;
        }

        return newTip.toFixed(2);
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
}

ko.applyBindings(new AppViewModel());