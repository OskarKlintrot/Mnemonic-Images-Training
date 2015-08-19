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
    var Letters = (function (_super) {
        __extends(Letters, _super);
        function Letters() {
            _super.call(this);
            this.practiceObject = {
                Letter: "Laddar...",
                MnemomicImage: "Laddar...",
                Timer: "Laddar..."
            };
            this.startpageObject = {
                firstItemID: "firstLetter",
                firstItemDescription: "Första bokstaven",
                lastItemID: "lastLetter",
                lastItemDescription: "Sista bokstaven"
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
            this.templates.startpage = '../../Templates/Shared/startpageDropdown.template';
            this.templates.info = '../../Templates/Letters/info.template';
        }
        Letters.prototype.init = function () {
            var _this = this;
            try {
                this.renderStartpage(this.templates.startpage, this.startpageObject, function () {
                    _this.renderInfo(_this.templates.info, null);
                    _this.setupDropdownMenus([_this.startpageObject.firstItemID, _this.startpageObject.lastItemID], _this.mnemonicImages.getAlphabetImages());
                    _this.playground = $("#playground");
                    _this.playgroundSetup();
                });
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        Letters.prototype.playgroundSetup = function () {
            var _this = this;
            this.renderPlayground(this.templates.practice, this.practiceObject, function () { _this.practiceSetup(); });
        };
        Letters.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $FirstLetterHTML = $("#firstLetter");
                var $LastLetterHTML = $("#lastLetter");
                var $Mode = $("#mode");
                var $CountdownHTML = $("#countdown");
                var random = false;
                if ($Mode.val() == 1) {
                    random = true;
                }
                ;
                if (isNaN(+$FirstLetterHTML.val()) || isNaN(+$LastLetterHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                if ($FirstLetterHTML.val() === "" || $LastLetterHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");
                if (+$FirstLetterHTML.val() > +$LastLetterHTML.val())
                    throw new RangeError("Första bokstaven måste komma före andra bokstaven!");
                var MnemomicImages = this.mnemonicImages.getAlphabetImages(+$FirstLetterHTML.val(), +$LastLetterHTML.val(), random);
                this.practiceRun(MnemomicImages);
            }
            catch (e) {
                this.playground.empty();
                var errorObject = {
                    ErrorMessage: e.message
                };
                $.get(this.templates.error, function (template) {
                    _this.renderContent(template, _this.playground, errorObject);
                });
            }
            ;
        };
        ;
        return Letters;
    })(mnemonicApp.GameEngine);
    mnemonicApp.Letters = Letters;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=Letters.js.map