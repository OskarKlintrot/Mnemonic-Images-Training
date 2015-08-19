/// <reference path="../typings/jquery/jquery.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var mnemonic = (function () {
        function mnemonic() {
            this.mnemonicData = new mnemonicApp.mnemonicData;
        }
        mnemonic.prototype.init = function () {
            try {
            }
            catch (e) {
                if (e instanceof RangeError) {
                    console.log(e.message);
                }
                else {
                    console.log("An error occurred: " + e.message);
                }
                ;
            }
            ;
        };
        mnemonic.prototype.writeStuff = function (source) {
            source.forEach(function (element, index, array) {
                console.log(element[0] + ": " + element[1]);
            });
        };
        return mnemonic;
    })();
    mnemonicApp.mnemonic = mnemonic;
})(mnemonicApp || (mnemonicApp = {}));
//window.onload = function () {
//    var temp: mnemonicApp.mnemonic = new mnemonicApp.mnemonic;
//    temp.init();
//}
//$(document).ready(function () {
//    var temp: mnemonicApp.mnemonic = new mnemonicApp.mnemonic;
//    temp.init();
//}); 
//# sourceMappingURL=mnemonic.js.map