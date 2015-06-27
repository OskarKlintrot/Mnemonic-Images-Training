"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var mnemonicData = (function () {
        function mnemonicData() {
            this.mnemonicNumberImages = [
                "Mask", "Näsa", "Hår", "Bulle", "Val", "Räv", "yXa", "Dörr", "Lök", "Cykel", "aNeMon",
                "aNaNas", "NöT", "NuBbe", "aNKare", "NaRrmössa", "NyPon", "NyStan", "NaGel", "NyCkel",
                "HuMla", "HaNd", "HaTt", "TaBlett", "TV", "HaRe", "TuPp", "HyDda", "HaLm", "TaCo", "BoM",
                "BeN (skelett)", "BåT", "BeBis", "BoK", "BåR", "BoJ", "BaDkar", "BiL", "(jul-)BoCk",
                "KiMono", "KaNtarell", "VaTtenmelon", "KaBel", "KiWi", "Krita", "KeX", "VaS", "VåG",
                "KoCkmössa", "RoM", "RuNsten", "FoT", "RaBarber", "Raket (nyårs-)", "FåR", "RiPa", "RaDio",
                "FiLm-rulle", "RaCket", "PuMa", "JeaNs", "PiZza", "JoBbarhjälm", "JuKebox", "JoRdglob",
                "PaPaya", "PiStol", "PaLm", "JuiCepaket", "DoMino", "DiNosaurie", "Shorts", "DuBb-däck",
                "DyKare", "Drake", "Spindel", "DoSa", "SåG", "SäCk", "GeM", "LöNnlöv", "LaTte", "eLBas",
                "oLiV", "GaRdin", "LeoPardmjukisdjur", "GåS", "GaLge", "LoCktång", "CyMbal", "CoNtainer",
                "CiTronskiva", "CaBriolet", "CyKlopöga", "CeRat", "CaPotasto", "CD-skiva", "CyLinder", "CoCktail"
            ];
            this.mnemonicMonthImages = [
                [["Januari"], ["Nyårssmällare"]],
                [["Februari"], ["Hjärta"]],
                [["Mars"], ["Ägg"]],
                [["April"], ["Vattendroppe"]],
                [["Maj"], ["Majblomma"]],
                [["Juni"], ["Midsommarstång"]],
                [["Juli"], ["Badbrygga"]],
                [["Augusti"], ["Kräftskivehatt"]],
                [["September"], ["Linjal"]],
                [["Oktober"], ["Istapp"]],
                [["November"], ["Snögubbe"]],
                [["December"], ["Julklapp"]]
            ];
            this.mnemonicDaysImages = [
                [["MåNdag"], ["MoNitor"]],
                [["TiSdag"], ["TiStel"]],
                [["oNSdag"], ["iNSekt"]],
                [["ToRsdag"], ["ToRped (ubåts-)"]],
                [["FRedag"], ["Fredssymbol på halsband"]],
                [["LöRdag"], ["LeRkruka"]],
                [["SöNdag"], ["SaNdslott"]]
            ];
            this.mnemonicAlphabetImages = [
                [["A"], ["Ark"]],
                [["B"], ["Buddha"]],
                [["C"], ["Chokladtårta"]],
                [["D"], ["Diskett"]],
                [["E"], ["Ek"]],
                [["F"], ["Fiskedrag"]],
                [["G"], ["Gris"]],
                [["H"], ["Hallon"]],
                [["I"], ["Iller"]],
                [["J"], ["Jordgubbe"]],
                [["K"], ["Kudde"]],
                [["L"], ["Limehalva"]],
                [["M"], ["Mullvad"]],
                [["N"], ["Nagelfil"]],
                [["O"], ["Orm"]],
                [["P"], ["Pyramid"]],
                [["Q"], ["Quinoa"]],
                [["R"], ["Rissäck"]],
                [["S"], ["Skoter"]],
                [["T"], ["Tornado"]],
                [["U"], ["Uniform"]],
                [["V"], ["Vanlijstång"]],
                [["W"], ["Wokpanna"]],
                [["X"], ["Xylofon"]],
                [["Y"], ["Yoghurt"]],
                [["Z"], ["Zombie"]],
                [["Å"], ["Ål"]],
                [["Ä"], ["Älghorn"]],
                [["Ö"], ["Öronskydd"]]
            ];
        }
        mnemonicData.prototype.checkRange = function (begin, end) {
            if (end === void 0) { end = 0; }
            if (!end) {
                throw new RangeError("\"end: number\" must be more than zero when using \"begin: number\"!");
            }
            ;
            if (begin > end) {
                throw new RangeError("\"end: number\" must be greater than \"begin: number\"!");
            }
            ;
        };
        mnemonicData.prototype.getAlphabetImages = function (begin, end, random) {
            if (!begin && !end) {
                return this.mnemonicAlphabetImages;
            }
            else {
                this.checkRange(begin, end);
            }
            ;
        };
        mnemonicData.prototype.getDaysImages = function (begin, end, random) {
            if (!begin && !end) {
                return this.mnemonicDaysImages;
            }
            else {
                this.checkRange(begin, end);
            }
            ;
        };
        mnemonicData.prototype.getMonthsImages = function (begin, end, random) {
            if (!begin && !end) {
                return this.mnemonicMonthImages;
            }
            else {
                this.checkRange(begin, end);
            }
            ;
            if (begin || end) {
                var beginEndObject = [];
                for (var i = begin; i <= end; i++) {
                    beginEndObject.push(this.mnemonicMonthImages[i]);
                }
            }
            if (!random) {
                return beginEndObject;
            }
            ;
            return this.mnemonicMonthImages;
        };
        mnemonicData.prototype.getNumberImages = function (begin, end, random) {
            if (!begin && !end) {
                return this.mnemonicNumberImages;
            }
            else {
                this.checkRange(begin, end);
            }
            ;
            if (begin || end) {
                var beginEndObject = [];
                for (var i = begin; i <= end; i++) {
                    beginEndObject.push(this.mnemonicNumberImages[i]);
                }
            }
            if (!random) {
                return beginEndObject;
            }
            ;
            if (random) {
                return this.mnemonicNumberImages;
            }
            ;
        };
        return mnemonicData;
    })();
    mnemonicApp.mnemonicData = mnemonicData;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=mnemonic-data.js.map