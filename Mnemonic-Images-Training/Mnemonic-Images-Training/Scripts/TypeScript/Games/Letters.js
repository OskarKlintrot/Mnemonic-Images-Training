/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var Letters = (function () {
        function Letters() {
            this.main = $("main");
            this.lead = $("p.lead");
        }
        Letters.prototype.init = function () {
            try {
                this.lead.empty();
                this.main.empty();
                this.main.append(location.hash + ": Dags att öva på bokstäver!");
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        return Letters;
    })();
    mnemonicApp.Letters = Letters;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=Letters.js.map