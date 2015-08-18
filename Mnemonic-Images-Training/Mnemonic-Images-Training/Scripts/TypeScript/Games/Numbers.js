/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mnemonicApp;
(function (mnemonicApp) {
    var Numbers = (function (_super) {
        __extends(Numbers, _super);
        function Numbers() {
            _super.call(this);
            //private main: JQuery;
            //private playground: JQuery;
            //private lead: JQuery;
            //private mnemonicImages: mnemonicData;
            this.practiceObject = {
                Number: "Laddar...",
                MnemomicImage: "Laddar...",
                Timer: "Laddar..."
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
        }
        Numbers.prototype.init = function () {
            var _this = this;
            try {
                this.renderStartpage('../../Templates/Numbers/startpage.template', function () {
                    _this.playground = $("#playground");
                    _this.playgroundSetup();
                });
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        Numbers.prototype.playgroundSetup = function () {
            var _this = this;
            if ($("#firstNumber").val().length <= 2)
                this.renderPlayground('../../Templates/Numbers/practice.template', this.practiceObject, function () { _this.practiceSetup(); });
            else
                this.renderPlayground('../../Templates/Numbers/practiceThreeChar.template', this.practiceObject, function () { _this.practiceSetup(); });
        };
        Numbers.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $NumberHTML = $("#Number");
                var $FirstNumberHTML = $("#firstNumber");
                var $LastNumberHTML = $("#lastNumber");
                var $Mode = $("#mode");
                var $CountdownHTML = $("#countdown");
                var random = false;
                if ($Mode.val() == 1) {
                    random = true;
                }
                ;
                if (isNaN(+$FirstNumberHTML.val()) || isNaN(+$LastNumberHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                if ($FirstNumberHTML.val() === "" || $LastNumberHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");
                if (+$FirstNumberHTML.val() > +$LastNumberHTML.val())
                    throw new RangeError("Första talet måste vara mindre än andra talet!");
                if ($FirstNumberHTML.val().length <= 2)
                    var MnemomicImages = this.mnemonicImages.getNumberImages(+$FirstNumberHTML.val(), +$LastNumberHTML.val(), random);
                if ($FirstNumberHTML.val().length > 2)
                    var MnemomicImages = this.mnemonicImages.getThreeCharNumberImages(+$FirstNumberHTML.val(), +$LastNumberHTML.val(), random);
                this.practiceRun($NumberHTML, MnemomicImages);
            }
            catch (e) {
                this.playground.empty();
                var errorObject = {
                    ErrorMessage: e.message
                };
                $.get('../../Templates/error.template', function (template) {
                    _this.renderContent(template, _this.playground, errorObject);
                });
            }
            ;
        };
        ;
        return Numbers;
    })(mnemonicApp.GameEngine);
    mnemonicApp.Numbers = Numbers;
})(mnemonicApp || (mnemonicApp = {}));
