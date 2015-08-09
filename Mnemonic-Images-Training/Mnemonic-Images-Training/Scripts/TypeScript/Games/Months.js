/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var Months = (function () {
        function Months() {
            this.main = $("main");
            this.lead = $("p.lead");
        }
        Months.prototype.init = function () {
            try {
                this.lead.empty();
                this.main.empty();
                this.main.append(location.hash + ": Dags att öva på månaderna!");
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        return Months;
    })();
    mnemonicApp.Months = Months;
})(mnemonicApp || (mnemonicApp = {}));
