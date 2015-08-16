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
    var Months = (function (_super) {
        __extends(Months, _super);
        function Months() {
            _super.call(this);
            this.practiceObject = {
                Month: "Laddar...",
                MnemomicImage: "Laddar...",
                Timer: "Laddar..."
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
        }
        Months.prototype.init = function () {
            var _this = this;
            try {
                var startPageTemplate = "";
                this.lead.empty();
                this.main.empty();
                $.get('../../Templates/Months/startpage.template', function (template) {
                    _this.renderContent(template, _this.main, null);
                    _this.setupDropdownMenus("firstMonth", _this.mnemonicImages.getMonthsImages());
                    _this.setupDropdownMenus("lastMonth", _this.mnemonicImages.getMonthsImages());
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
            var renderPlayground = function () {
                $.get('../../Templates/Months/practice.template', function (template) {
                    _this.renderContent(template, _this.playground, _this.practiceObject);
                    _this.practiceSetup();
                });
            };
            $("#Start").click(function () {
                if (_this.playground.is(":empty")) {
                    renderPlayground();
                }
                else {
                }
                ;
            });
        };
        Months.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $MonthHTML = $("#Month");
                var $MnemomicImageHTML = $("#MnemomicImage");
                var $MnemomicImageButton = $("#MnemomicImageButton");
                var $FirstMonthHTML = $("#firstMonth");
                var $LastMonthHTML = $("#lastMonth");
                var $LearningHTML = $("#Learning");
                var $Mode = $("#mode");
                var $Training = $("#Training");
                var $TimerHTML = $("#Timer");
                var $CountdownHTML = $("#countdown");
                var $NextHTML = $("#Next");
                var $StartButton = $("#Start");
                var $PauseButton = $("#Pause");
                var $StopButton = $("#Stop");
                var countdown = $CountdownHTML.val() - 1;
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
                console.log($FirstMonthHTML.val());
                var MnemomicImages = this.mnemonicImages.getMonthsImages(+$FirstMonthHTML.val(), +$LastMonthHTML.val(), random);
                if ($Mode.val() == 1) {
                    $MnemomicImageHTML.addClass('hide');
                    $MnemomicImageButton.removeClass('hide');
                }
                else {
                    $MnemomicImageHTML.removeClass('hide');
                    $MnemomicImageButton.addClass('hide');
                }
                ;
                $MonthHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);
                // Countdown and slide
                var count = countdown;
                var length = MnemomicImages.length;
                var clear = [$MonthHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];
                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $MonthHTML, MnemomicImages, countdown, length, count, clear);
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
        return Months;
    })(mnemonicApp.GameEngine);
    mnemonicApp.Months = Months;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=Months.js.map