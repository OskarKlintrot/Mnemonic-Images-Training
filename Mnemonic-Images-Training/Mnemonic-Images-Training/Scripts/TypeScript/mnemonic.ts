"use strict";

module mnemonicApp {
    export class mnemonic {
        private mnemonicData: mnemonicData;

        constructor() {
            this.mnemonicData = new mnemonicData;
        }

        init() {
            try {
                var test: string[][][];
                test = this.mnemonicData.getAlphabetImages(0, 5, true);
                this.writeStuff(test);
                test = this.mnemonicData.getDaysImages(2, 4);
                this.writeStuff(test);
                test = this.mnemonicData.getMonthsImages(2, 4);
                this.writeStuff(test);
                test = this.mnemonicData.getNumberImages(0, 4, true);
                this.writeStuff(test);
            } catch (e) {
                if (e instanceof RangeError) {
                    console.log(e.message);
                } else {
                    console.log("An error occurred: " + e.message);
                };
            };
        }

        writeStuff(source: string[][][]) {
            source.forEach(function (element, index, array) {
                console.log(element[0] + ": " + element[1]);
            });
        }
    }
}

window.onload = function () {
    var temp: mnemonicApp.mnemonic = new mnemonicApp.mnemonic;
    temp.init();
}