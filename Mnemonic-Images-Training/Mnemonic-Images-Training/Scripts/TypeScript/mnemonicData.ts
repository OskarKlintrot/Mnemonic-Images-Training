"use strict";

module mnemonicApp {
    export class mnemonicData {
        private mnemonicNumberImages =
        [
            [ "00"  , "Mask" ],
            [ "01"  , "Näsa" ],
            [ "02"  , "Hår" ],
            [ "03"  , "Bulle" ],
            [ "04"  , "Val" ],
            [ "05"  , "Räv" ],
            [ "06"  , "yXa" ],
            [ "07"  , "Dörr" ],
            [ "08"  , "Lök" ],
            [ "09"  , "Cykel" ],
            [ "10" , "aNeMon" ],
            [ "11" , "aNaNas" ],
            [ "12" , "NöT" ],
            [ "13" , "NuBbe" ],
            [ "14" , "aNKare" ],
            [ "15" , "NaRrmössa" ],
            [ "16" , "NyPon" ],
            [ "17" , "NyStan" ],
            [ "18" , "NaGel" ],
            [ "19" , "NyCkel" ],
            [ "20" , "HuMla" ],
            [ "21" , "HaNd" ],
            [ "22" , "HaTt" ],
            [ "23" , "TaBlett" ],
            [ "24" , "TV" ],
            [ "25" , "HaRe" ],
            [ "26" , "TuPp" ],
            [ "27" , "HyDda" ],
            [ "28" , "HaLm" ],
            [ "29" , "TaCo" ],
            [ "30" , "BoM" ],
            [ "31" , "BeN (skelett)" ],
            [ "32" , "BåT" ],
            [ "33" , "BeBis" ],
            [ "34" , "BoK" ],
            [ "35" , "BåR" ],
            [ "36" , "BoJ" ],
            [ "37" , "BaDkar" ],
            [ "38" , "BiL" ],
            [ "39" , "(jul-)BoCk" ],
            [ "40" , "KiMono" ],
            [ "41" , "KaNtarell" ],
            [ "42" , "VaTtenmelon" ],
            [ "43" , "KaBel" ],
            [ "44" , "KiWi" ],
            [ "45" , "Krita" ],
            [ "46" , "KeX" ],
            [ "47" , "VaS" ],
            [ "48" , "VåG" ],
            [ "49" , "KoCkmössa" ],
            [ "50" , "RoM" ],
            [ "51" , "RuNsten" ],
            [ "52" , "FoT" ],
            [ "53" , "RaBarber" ],
            [ "54" , "Raket (nyårs-)" ],
            [ "55" , "FåR" ],
            [ "56" , "RiPa" ],
            [ "57" , "RaDio" ],
            [ "58" , "FiLm-rulle" ],
            [ "59" , "RaCket" ],
            [ "60" , "PuMa" ],
            [ "61" , "JeaNs" ],
            [ "62" , "PiZza" ],
            [ "63" , "JoBbarhjälm" ],
            [ "64" , "JuKebox" ],
            [ "65" , "JoRdglob" ],
            [ "66" , "PaPaya" ],
            [ "67" , "PiStol" ],
            [ "68" , "PaLm" ],
            [ "69" , "JuiCepaket" ],
            [ "70" , "DoMino" ],
            [ "71" , "DiNosaurie" ],
            [ "72" , "Shorts" ],
            [ "73" , "DuBb-däck" ],
            [ "74" , "DyKare" ],
            [ "75" , "Drake" ],
            [ "76" , "Spindel" ],
            [ "77" , "DoSa" ],
            [ "78" , "SåG" ],
            [ "79" , "SäCk" ],
            [ "80" , "GeM" ],
            [ "81" , "LöNnlöv" ],
            [ "82" , "LaTte" ],
            [ "83" , "eLBas" ],
            [ "84" , "oLiV" ],
            [ "85" , "GaRdin" ],
            [ "86" , "LeoPardmjukisdjur" ],
            [ "87" , "GåS" ],
            [ "88" , "GaLge" ],
            [ "89" , "LoCktång" ],
            [ "90" , "CyMbal" ],
            [ "91" , "CoNtainer" ],
            [ "92" , "CiTronskiva" ],
            [ "93" , "CaBriolet" ],
            [ "94" , "CyKlopöga" ],
            [ "95" , "CeRat" ],
            [ "96" , "CaPotasto" ],
            [ "97" , "CD-skiva" ],
            [ "98" , "CyLinder" ],
            [ "99" , "CoCktail" ]
        ];

        private mnemonicMonthImages =
        [
            [ "Januari", "Nyårssmällare" ],
            [ "Februari", "Hjärta" ],
            [ "Mars", "Ägg" ],
            [ "April", "Vattendroppe" ],
            [ "Maj", "Majblomma" ],
            [ "Juni", "Midsommarstång" ],
            [ "Juli", "Badbrygga" ],
            [ "Augusti", "Kräftskivehatt" ],
            [ "September", "Linjal" ],
            [ "Oktober", "Istapp" ],
            [ "November", "Snögubbe" ],
            [ "December", "Julklapp" ]
        ];

        private mnemonicDaysImages =
        [
            ["MåNdag", "MoNitor"],
            ["TiSdag", "TiStel"],
            ["oNSdag", "iNSekt"],
            ["ToRsdag", "ToRped (ubåts-)"],
            ["FRedag", "Fredssymbol"], // "på halsband"
            ["LöRdag", "LeRkruka"],
            ["SöNdag", "SaNdslott"]
        ];

        private mnemonicAlphabetImages =
        [
            ["A", "Ark"],
            ["B", "Buddha"],
            ["C", "Chokladtårta"],
            ["D", "Diskett"],
            ["E", "Ek"],
            ["F", "Fiskedrag"],
            ["G", "Gris"],
            ["H", "Hallon"],
            ["I", "Iller"],
            ["J", "Jordgubbe"],
            ["K", "Kudde"],
            ["L", "Limehalva"],
            ["M", "Mullvad"],
            ["N", "Nagelfil"],
            ["O", "Orm"],
            ["P", "Pyramid"],
            ["Q", "Quinoa"],
            ["R", "Rissäck"],
            ["S", "Skoter"],
            ["T", "Tornado"],
            ["U", "Uniform"],
            ["V", "Vanlijstång"],
            ["W", "Wokpanna"],
            ["X", "Xylofon"],
            ["Y", "Yoghurt"],
            ["Z", "Zombie"],
            ["Å", "Ål"],
            ["Ä", "Älghorn"],
            ["Ö", "Öronskydd"]
        ];

        private mnemonicNameImages =
        [
            // Female names
            ["Anna", "Ananasring"],
            ["Eva", "Vev (veva)"],
            ["Maria", "Krubba"],
            ["Karin", "Kar"],
            ["Kerstin", "Tjära"],
            ["Lena", "Fena"],
            ["Kristina", "Diadem (drottning)"], // Kors (kristi-)
            ["Ingrid", "Ridhjälm"],
            ["Sara", "Varningsskylt (fara)"],
            ["Emma", "Femma"], // Klämma
            ["Ulla", "Ull"],
            ["Birgitta", "Nunneslöja (Heliga Birgitta)"],
            ["Inger", "Finger"],
            ["Marie", "Mariekex"],
            ["Malin", "Mal"],
            ["Jenny", "Jenka-tuggummi"],
            ["Annika", "Gul t-shirt (Pippis kompis)"],
            ["Monica", "Måne"],
            ["Linda", "Linda"],
            ["Susanne", "Sovsäck (sussa)"],
            ["Elin", "Elkontakt"],
            ["Hanna", "Handtag"],
            ["Johanna", "Visselpipa (\"Kan du vissla Johanna? \")" ],
            ["Carina", "Okarina"],
            ["Elisabeth", "Rödbeta"],
            ["Sofia", "Sol"],
            ["Katarina", "Katamaran"],
            ["Margareta", "Krok"],
            ["Marianne", "Mariannegodispåse"],
            ["Anita", "Nitar"],
            ["Åsa", "Måsar"],
            ["Helena", "Gelé"],
            ["Anette", "Etikett"],
            ["Gunilla", "Prilla"],
            ["Barbro", "Barbapa"],
            ["Siv", "Giv (kort)"],
            ["Emelie", "Melonskiva"],
            ["Camilla", "Kamomillte"],
            ["Ida", "Skida"],
            ["Sandra", "Sand"],
            ["Linnéa", "Blommor (Linné)"],
            ["Ann", "Dank"],
            ["Anneli", "Lie"],
            ["Therese", "Termos"],
            ["Julia", "Hjul"],
            ["Cecilia", "Sil med lian"],
            ["Gun", "Pistol"],
            ["Helen", "Hel en"],
            ["Josefin", "Josförpackning"],
            ["Jessica", "ICA-skylt"],

            // Male name
            ["Lars", "Garagedörr"], // Larv
            ["Karl", "Karl-Johansvamp"],
            ["Anders", "And"],
            ["Mikael", "Mikrovågsugn"],
            ["Johan", "Jord"], // Juicepaket
            ["Per", "Periskop"],
            ["Erik", "Plånbok (é rik)"],
            ["Jan", "Banan"],
            ["Peter", "Panflöjt"],
            ["Thomas", "Tomat"], // Tomburk
            ["Hans", "Handske"],
            ["Fredrik", "Fredspipa"],
            ["Bengt", "Polisbatong (\"bengen\")" ],
            ["Daniel", "Danssko"],
            ["Sven", "Duva (Sven Dufva)"],
            ["Mats", "Palats"],
            ["Bo", "Bofink"],
            ["Nils", "Apa (herr Nilsson)"],
            ["Andreas", "Röd prislapp (rea)"],
            ["Stefan", "Stekpanna"],
            ["Marcus", "Marker"],
            ["Magnus", "Snus (dosa)"],
            ["Mattias", "Guldmedalj"],
            ["Jonas", "Potatis (Alströmer)"],
            ["Leif", "Sleif"],
            ["Niklas", "Nickelbatteri"],
            ["Martin", "Martini"],
            ["Björn", "Björn"],
            ["Ulf", "Ulv"],
            ["Patrik", "Höjdhoppsribba (Sjöberg)"],
            ["Christer", "Törnkrona (kristus)"],
            ["Kjell", "Fjäll (fisk-)"],
            ["Stig", "Skylt"],
            ["Henrik", "Svensk landslagströja (Henke Larsson)"],
            ["Joakim", "Kassavalvsdörr (Joakim von Anka)"],
            ["Oskar", "Tors hammare (åska)"],
            ["Alexander", "Anknäbb (Alexander Lukas)"],
            ["Rolf", "Rollerblades"],
            ["David", "Spira (kung David)"],
            ["Lennart", "Päls (len)"],
            ["Viktor", "Hand som gör segertecken (victory)"],
            ["Tommy", "Tomte"],
            ["Christoffer", "Jesus på korset (krist offer)"],
            ["Göran", "Socialdemokratnål"],
            ["Simon", "Simfena"],
            ["Robert", "Klorin (Robert Gustafsson)"],
            ["Gustav", "Stavar (vasaloppet)"],
            ["Emil", "Träfigur (Emil i Lönneberga)"],
            ["Håkan", "Hockeyklubba"],
            ["Filip", "Filmjölk"]
        ];

        private checkRange(begin: number, end: number, lenght: number) {
            if (begin < 0) {
                throw new RangeError("\"begin: number\" must be more than zero!");
            }
            if (!end) {
                throw new RangeError("\"end: number\" must be more than zero when using \"begin: number\"!");
            };
            if (begin > end) {
                throw new RangeError("\"end: number\" must be greater than \"begin: number\"!");
            };
            if (end > (lenght - 1)) {
                throw new RangeError("Out of range (\"begin\" - \"end\" > " + (lenght - 1) + ") !");
            };
        }

        // A big thanks to Anton K. Andersson, http://antonkandersson.se/, for teaching me the following code
        private pushArray(begin: number, end: number, source: string[][]) {
            return source.filter(function (element, index, array) {
                return index >= begin && index < end;
            });
        }

        // From http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        private shuffleArray(array: string[][]) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        getAlphabetImages(begin?: number, end?: number, random?: boolean) {
            if (!begin && !end) {
                return this.mnemonicAlphabetImages;
            } else {
                this.checkRange(begin, end, this.mnemonicAlphabetImages.length);
            };
            
            if (begin || end) {
                var straightArray: string[][] = this.pushArray(begin, end + 1, this.mnemonicAlphabetImages);
            }

            if (!random) {
                return straightArray;
            };

            if (random) {
                return this.shuffleArray(straightArray);
            };
        }

        getDaysImages(begin?: number, end?: number, random?: boolean) {
            if (!begin && !end) {
                return this.mnemonicDaysImages;
            } else {
                this.checkRange(begin, end, this.mnemonicDaysImages.length);
            };

            if (begin || end) {
                var straightArray: string[][] = this.pushArray(begin, end + 1, this.mnemonicDaysImages);
            }

            if (!random) {
                return straightArray;
            };

            if (random) {
                return this.shuffleArray(straightArray);
            };
        }

        getMonthsImages(begin?: number, end?: number, random?: boolean) {
            if (!begin && !end) {
                return this.mnemonicMonthImages;
            } else {
                this.checkRange(begin, end, this.mnemonicMonthImages.length);
            };

            if (begin || end) {
                var straightArray: string[][] = this.pushArray(begin, end + 1, this.mnemonicMonthImages);
            }

            if (!random) {
                return straightArray;
            };

            if (random) {
                return this.shuffleArray(straightArray);
            };
        }

        getNumberImages(begin?: number, end?: number, random?: boolean) {
            if (!begin && !end) {
                return this.mnemonicNumberImages;
            } else {
                this.checkRange(begin, end, this.mnemonicNumberImages.length);
            };

            if (begin || end) {
                var straightArray: string[][] = this.pushArray(begin, end + 1, this.mnemonicNumberImages);
            }

            if (!random) {
                return straightArray;
            };

            if (random) {
                return this.shuffleArray(straightArray);
            };
        }

        getNameImages(begin?: number, end?: number, random?: boolean) {
            if (!begin && !end) {
                return this.mnemonicNameImages;
            } else {
                this.checkRange(begin, end, this.mnemonicNameImages.length);
            };

            if (begin || end) {
                var straightArray: string[][] = this.pushArray(begin, end + 1, this.mnemonicNameImages);
            }

            if (!random) {
                return straightArray;
            };

            if (random) {
                return this.shuffleArray(straightArray);
            };
        }
    }
}