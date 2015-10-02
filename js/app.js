/* global ko */
/* global Engine */

function AppViewModel() {
    var self = this;

    this.billAmount = ko.observable(31.32);
    this.tipPercent = ko.observable(20);
    this.roundDirection = ko.observable("up");

    this.tipAmount = ko.computed(function () {
        return Engine.calculateTip(self.billAmount(), self.tipPercent(), self.roundDirection());
    }, this);

    this.roundedTotal = ko.computed(function () {
        return formatCurrency((+self.billAmount() + +self.tipAmount()))
    }, this);
    
    this.actualTipPercent = ko.computed(function () {
        return ((+self.tipAmount() / +self.billAmount()) * 100);
    }, this);
    
    this.tipToText = ko.computed(function () {
        return self.tipAmount() + " (" + formatPercent(self.actualTipPercent()) + ")";
    });

    function formatCurrency(num) {
      return num.toFixed(2);
    }

    function formatPercent(num) {
      return num.toFixed(1) + "%";
    }
}

ko.applyBindings(new AppViewModel());