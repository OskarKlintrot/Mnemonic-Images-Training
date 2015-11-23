/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mnemonicApp;
(function (mnemonicApp) {
    var Months = (function (_super) {
        __extends(Months, _super);
        function Months() {
            _super.call(this);
            this.practiceObject = {
                Month: "Laddar...",
                MnemomicImage: "Laddar...",
                Timer: "Laddar..."
            };
            this.startpageObject = {
                firstItemID: "firstMonth",
                firstItemDescription: "Första månaden",
                lastItemID: "lastMonth",
                lastItemDescription: "Sista månaden"
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
            this.templates.startpage = '../../Templates/Shared/startpageDropdown.template';
            this.templates.info = '../../Templates/Months/info.template';
        }
        Months.prototype.init = function () {
            var _this = this;
            try {
                this.renderStartpage(this.templates.startpage, this.startpageObject, function () {
                    _this.renderInfo(_this.templates.info, null);
                    _this.setupDropdownMenus([_this.startpageObject.firstItemID, _this.startpageObject.lastItemID], _this.mnemonicImages.getMonthsImages());
                    _this.playground = $("#playground");
                    _this.playgroundSetup();
                });
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        Months.prototype.playgroundSetup = function () {
            var _this = this;
            this.renderPlayground(this.templates.practice, this.practiceObject, function () { _this.practiceSetup(); });
        };
        Months.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $FirstMonthHTML = $("#firstMonth");
                var $LastMonthHTML = $("#lastMonth");
                var $Mode = $("#mode");
                var $CountdownHTML = $("#countdown");
                var random = false;
                if ($Mode.val() == 1) {
                    random = true;
                }
                ;
                if (isNaN(+$FirstMonthHTML.val()) || isNaN(+$LastMonthHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                if ($FirstMonthHTML.val() === "" || $LastMonthHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");
                if (+$FirstMonthHTML.val() > +$LastMonthHTML.val())
                    throw new RangeError("Första månaden måste komma före andra månaden!");
                var MnemomicImages = this.mnemonicImages.getMonthsImages(+$FirstMonthHTML.val(), +$LastMonthHTML.val(), random);
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
        return Months;
    })(mnemonicApp.GameEngine);
    mnemonicApp.Months = Months;
})(mnemonicApp || (mnemonicApp = {}));
