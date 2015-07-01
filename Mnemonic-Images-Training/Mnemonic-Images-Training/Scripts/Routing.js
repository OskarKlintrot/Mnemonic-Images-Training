"use strict";

window.onload = function () {
    var temp = new mnemonicApp.mnemonic;
    temp.init();

    if ("onhashchange" in window) {
        console.log("The browser supports the hashchange event!");
    }

    function locationHashChanged() {
        if (location.hash === "#numbers") {
            var numbers = new mnemonicApp.Numbers;
            numbers.init();
        }
        if (location.hash === "#letters") {
            var letters = new mnemonicApp.Letters;
            letters.init();
        }
        if (location.hash === "#days") {
            var days = new mnemonicApp.Days;
            days.init();
        }
        if (location.hash === "#months") {
            var months = new mnemonicApp.Months;
            months.init();
        }
        if (location.hash === "#about") {
            var about = new mnemonicApp.About;
            about.init();
        }
    }

    window.onhashchange = locationHashChanged;

    if (window.location.hash) {
        locationHashChanged();
    }
}

//$(document).ready(function () {
//    var temp: mnemonicApp.mnemonic = new mnemonicApp.mnemonic;
//    temp.init();
//});