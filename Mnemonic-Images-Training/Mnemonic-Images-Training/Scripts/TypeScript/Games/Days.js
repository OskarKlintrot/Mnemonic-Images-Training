/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var Days = (function () {
        function Days() {
            this.main = $("main");
            this.lead = $("p.lead");
        }
        Days.prototype.init = function () {
            try {
                this.lead.empty();
                this.main.empty();
                this.main.append(location.hash + ": Dags att öva på veckodagar!");
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        return Days;
    })();
    mnemonicApp.Days = Days;
})(mnemonicApp || (mnemonicApp = {}));
