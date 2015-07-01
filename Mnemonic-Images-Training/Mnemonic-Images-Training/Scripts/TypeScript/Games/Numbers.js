/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var Numbers = (function () {
        function Numbers() {
            this.main = $("main");
            this.lead = $("p.lead");
        }
        Numbers.prototype.init = function () {
            try {
                this.lead.empty();
                this.main.empty();
                this.main.append(location.hash + ": Dags att öva på siffror!");
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        return Numbers;
    })();
    mnemonicApp.Numbers = Numbers;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=Numbers.js.map