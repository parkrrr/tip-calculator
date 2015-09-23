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
        return (+self.billAmount() + +self.tipAmount()).toFixed(2);
    }, this);
    
    this.actualTipPercent = ko.computed(function () {
        return ((+self.tipAmount() / +self.billAmount()) * 100).toFixed(1);
    }, this);
    
    this.tipToText = ko.computed(function () {
        return self.tipAmount() + " (" + self.actualTipPercent() + "%)";
    });
    
    this.refresh = function () {
        return Engine.calculateTip(self.billAmount(), self.tipPercent(), self.roundDirection());
    };
}

ko.applyBindings(new AppViewModel());