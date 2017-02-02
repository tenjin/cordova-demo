// Tenjin Cordova Plugin Demo
// (c) 2017 Tenjin

// generic failure callback
var failure = function(reason) {
    console.log("Error: ", reason);
    window.plugins.toast.showLongTop("Error sending data to Tenjin.");
}

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {

        // get buttons from the DOM
        var transactionButton = document.querySelector('#sendTransactionButton');
        var eventButton = document.querySelector('#sendEventButton');
        var eventAndValueButton = document.querySelector('#sendEventAndValueButton');

        // wire buttons to the event handlers
        transactionButton.addEventListener('click', app.sendTransaction, false);
        eventButton.addEventListener('click', app.sendEvent, false);
        eventAndValueButton.addEventListener('click', app.sendEventAndValue, false);
    },

    sendTransaction: function(evt) {
        // Get the data from the form
        var productName = document.querySelector('#productName').value;
        var currency = document.querySelector('#currency').value;
        var quantity = parseInt(document.querySelector('#quantity').value);
        var unitPrice = parseFloat(document.querySelector('#unitPrice').value);

        // optional success callback
        var success = function() {
            window.plugins.toast.showShortTop("Sent transaction");
        }

        // Send to Tenjin
        tenjin.transaction(productName, currency, quantity, unitPrice, success, failure);
    },

    sendEvent: function(evt) {
        // Get the data from the form
        var eventName = document.querySelector('#eventName').value;

        // optional success callback
        var success = function() {
            window.plugins.toast.showShortTop("Sent event");
        }

        tenjin.sendEvent(eventName, success, failure);
    },

    sendEventAndValue: function(evt) {
        // Get the data from the form
        var eventName = document.querySelector('#eventName2').value;
        var integerValue = parseInt(document.querySelector('#eventValue').value);

        // optional success callback
        var success = function() {
            window.plugins.toast.showShortTop("Sent event and value");
        }

        tenjin.sendEventAndValue(eventName, integerValue, success, failure);
    }

};

app.initialize();
