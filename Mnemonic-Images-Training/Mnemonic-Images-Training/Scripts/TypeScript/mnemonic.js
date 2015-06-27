"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var mnemonic = (function () {
        function mnemonic() {
            this.mnemonicData = new mnemonicApp.mnemonicData;
        }
        mnemonic.prototype.init = function () {
            try {
                var test;
                test = this.mnemonicData.getAlphabetImages(0, 5, true);
                this.writeStuff(test);
                test = this.mnemonicData.getDaysImages(2, 4);
                this.writeStuff(test);
                test = this.mnemonicData.getMonthsImages(2, 4);
                this.writeStuff(test);
                test = this.mnemonicData.getNumberImages(0, 4, true);
                this.writeStuff(test);
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
window.onload = function () {
    var temp = new mnemonicApp.mnemonic;
    temp.init();
};
//# sourceMappingURL=mnemonic.js.map