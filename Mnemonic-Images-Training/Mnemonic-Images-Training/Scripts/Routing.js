"use strict";

window.onload = function () {

    var lead = $("p.lead").html();

    if ("onhashchange" in window) {
        console.log("The browser supports the hashchange event!");
    }

    function locationHashChanged() {
        if (location.hash.slice(2) === "numbers") {
            var numbers = new mnemonicApp.Numbers;
            numbers.init();
            changeClassActive("numbers");
        }
        if (location.hash.slice(2) === "letters") {
            var letters = new mnemonicApp.Letters;
            letters.init();
            changeClassActive("letters");
        }
        if (location.hash.slice(2) === "days") {
            var days = new mnemonicApp.Days;
            days.init();
            changeClassActive("days");
        }
        if (location.hash.slice(2) === "months") {
            var months = new mnemonicApp.Months;
            months.init();
            changeClassActive("months");
        }
        if (location.hash.slice(2) === "names") {
            var months = new mnemonicApp.Names;
            months.init();
            changeClassActive("names");
        }
        if (location.hash.slice(2) === "about") {
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