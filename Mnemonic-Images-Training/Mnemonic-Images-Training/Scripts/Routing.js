"use strict";

window.onload = function () {
    var temp = new mnemonicApp.mnemonic;
    temp.init();

    var lead = $("p.lead").html();

    if ("onhashchange" in window) {
        console.log("The browser supports the hashchange event!");
    }

    function locationHashChanged() {
        if (location.hash === "#numbers") {
            var numbers = new mnemonicApp.Numbers;
            numbers.init();
            changeClassActive("numbers");
        }
        if (location.hash === "#letters") {
            var letters = new mnemonicApp.Letters;
            letters.init();
            changeClassActive("letters");
        }
        if (location.hash === "#days") {
            var days = new mnemonicApp.Days;
            days.init();
            changeClassActive("days");
        }
        if (location.hash === "#months") {
            var months = new mnemonicApp.Months;
            months.init();
            changeClassActive("months");
        }
        if (location.hash === "#about") {
            var about = new mnemonicApp.About(lead);
            about.init();
            changeClassActive("about");
        }
    }

    function changeClassActive(page) {
        $("#navbar > ul > li").each(function () {
            $(this).removeClass("active");
        });
        $('a[href$="' + page + '"]').parent().addClass("active");
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