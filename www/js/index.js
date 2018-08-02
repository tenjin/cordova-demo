// Tenjin Cordova Plugin Demo
// (c) 2017-2018 Tenjin

// Get your API_KEY from https://www.tenjin.io/dashboard/organizations
let apiKey = "REPLACE_WITH_YOUR_API_KEY";

// generic failure callback
var failure = function(reason) {
    console.log("Error: ", reason);
    window.plugins.toast.showLongTop("Error sending data to Tenjin.");
}

var app = {

    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.addEventListener("resume", app.onResume, false);
    },

    // deviceready Event Handler
    onDeviceReady: async function() {

        // get buttons from the DOM
        var transactionButton = document.querySelector('#sendTransactionButton');
        var eventButton = document.querySelector('#sendEventButton');
        var eventAndValueButton = document.querySelector('#sendEventAndValueButton');

        // wire buttons to the event handlers
        transactionButton.addEventListener('click', app.sendTransaction, false);
        eventButton.addEventListener('click', app.sendEvent, false);
        eventAndValueButton.addEventListener('click', app.sendEventAndValue, false);

        app.connectTenjin();

    },

    checkOptIn: function() {

        if (app.optIn === undefined) {
            // demo opt-in / opt-out tracking, ask every time app starts
            app.optIn = confirm("GDPR Demo\n\nChoose OK to opt in\n\nChoose Cancel to opt out.");
        }

        return app.optIn;
    },

    connectTenjin: async function() {

        try {
            await tenjin.init(apiKey);

            let optIn = app.checkOptIn();

            if (optIn) {
                console.log('User opted it');
                await tenjin.optIn();
                //await tenjin.optInParams(['ip_address', 'advertising_id','developer_device_id', 'limit_ad_tracking', 'referrer', 'iad']);
                //await tenjin.optOutParams(['country', 'timezone', 'language'])
            } else {
                console.log('User opted out');
                await tenjin.optOut();
            }

            await tenjin.connect(); 
            
            // deep link handler is optional
            tenjin.registerDeepLinkHandler(params => {
                alert("The params are \n" + JSON.stringify(params, null, 2));
            });
        } catch (error) {
            console.log('ERROR ' + error);
            alert('ERROR ' + error);
        }
    },

    onResume: async function() {
        // Android needs to re-connect on resume
        if (cordova.platformId == 'ios') {
            return;
        }

        console.log('onResume');
        app.connectTenjin();
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
