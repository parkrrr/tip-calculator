/* global ko */
/* global Engine */

function AppViewModel() {
    var self = this;

    this.billAmount = ko.observable();
    this.tipPercent = ko.observable();
    this.roundDirection = ko.observable("none");

    this.tipAmount = ko.computed(function() {
        var tip = Engine.calculateTip(self.billAmount(), self.tipPercent(), self.roundDirection());
        if (Engine.isNumeric(tip)) return formatCurrency(tip);
    }, this);

    this.roundedTotal = ko.computed(function() {
        var total = (+self.billAmount() + +self.tipAmount())
        if (isNaN(total)) {
            return "N/A";
        }
        return formatCurrency(total)
    }, this);

    this.actualTipPercent = ko.computed(function() {
        var percent = (+self.tipAmount() / +self.billAmount()) * 100;
        return formatPercent(percent);
    }, this);

    this.tipToText = ko.computed(function() {
        if (isNaN(self.tipAmount())) {
            return "N/A";
        }
        return self.tipAmount() + " (" + self.actualTipPercent() + ")";
    });

    function formatCurrency(num) {
        return num.toFixed(2);
    }

    function formatPercent(num) {
        return num.toFixed(1) + "%";
    }
}

ko.applyBindings(new AppViewModel());
