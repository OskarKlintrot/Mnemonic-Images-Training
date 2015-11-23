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
    var Days = (function (_super) {
        __extends(Days, _super);
        function Days() {
            _super.call(this);
            this.practiceObject = {
                Day: "Laddar...",
                MnemomicImage: "Laddar...",
                Timer: "Laddar..."
            };
            this.startpageObject = {
                firstItemID: "firstDay",
                firstItemDescription: "Första dagen",
                lastItemID: "lastDay",
                lastItemDescription: "Sista dagen"
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
            this.templates.startpage = '../../Templates/Shared/startpageDropdown.template';
            this.templates.info = '../../Templates/Days/info.template';
        }
        Days.prototype.init = function () {
            var _this = this;
            try {
                this.renderStartpage(this.templates.startpage, this.startpageObject, function () {
                    _this.renderInfo(_this.templates.info, null);
                    _this.setupDropdownMenus(["firstDay", "lastDay"], _this.mnemonicImages.getDaysImages());
                    _this.playground = $("#playground");
                    _this.playgroundSetup();
                });
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        Days.prototype.playgroundSetup = function () {
            var _this = this;
            this.renderPlayground(this.templates.practice, this.practiceObject, function () { _this.practiceSetup(); });
        };
        Days.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $FirstDayHTML = $("#firstDay");
                var $LastDayHTML = $("#lastDay");
                var $Mode = $("#mode");
                var $CountdownHTML = $("#countdown");
                var random = false;
                if ($Mode.val() == 1) {
                    random = true;
                }
                ;
                if (isNaN(+$FirstDayHTML.val()) || isNaN(+$LastDayHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                if ($FirstDayHTML.val() === "" || $LastDayHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");
                if (+$FirstDayHTML.val() > +$LastDayHTML.val())
                    throw new RangeError("Första dagen måste komma före andra dagen!");
                var MnemomicImages = this.mnemonicImages.getDaysImages(+$FirstDayHTML.val(), +$LastDayHTML.val(), random);
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
        return Days;
    })(mnemonicApp.GameEngine);
    mnemonicApp.Days = Days;
})(mnemonicApp || (mnemonicApp = {}));
