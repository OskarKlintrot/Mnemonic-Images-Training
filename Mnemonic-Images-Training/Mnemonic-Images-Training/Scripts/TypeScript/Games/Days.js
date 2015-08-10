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
    var Days = (function (_super) {
        __extends(Days, _super);
        function Days() {
            _super.call(this);
            this.practiceObject = {
                Day: "Laddar...",
                MnemomicImage: "Laddar...",
                Timer: "Laddar..."
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
        }
        Days.prototype.init = function () {
            var _this = this;
            try {
                var startPageTemplate = "";
                this.lead.empty();
                this.main.empty();
                $.get('../../Templates/Days/startpage.template', function (template) {
                    _this.renderContent(template, _this.main, null);
                    _this.setupDropdownMenus("firstDay", _this.mnemonicImages.getDaysImages());
                    _this.setupDropdownMenus("lastDay", _this.mnemonicImages.getDaysImages());
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
            var renderPlayground = function () {
                $.get('../../Templates/Days/practice.template', function (template) {
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
        Days.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $DayHTML = $("#Day");
                var $MnemomicImageHTML = $("#MnemomicImage");
                var $MnemomicImageButton = $("#MnemomicImageButton");
                var $FirstDayHTML = $("#firstDay");
                var $LastDayHTML = $("#lastDay");
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
                if (isNaN(+$FirstDayHTML.val()) || isNaN(+$LastDayHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                if ($FirstDayHTML.val() === "" || $LastDayHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");
                if (+$FirstDayHTML.val() > +$LastDayHTML.val())
                    throw new RangeError("Första dagen måste komma före andra dagen!");
                console.log($FirstDayHTML.val());
                var MnemomicImages = this.mnemonicImages.getDaysImages(+$FirstDayHTML.val(), +$LastDayHTML.val(), random);
                if ($Mode.val() == 1) {
                    $MnemomicImageHTML.addClass('hide');
                    $MnemomicImageButton.removeClass('hide');
                }
                else {
                    $MnemomicImageHTML.removeClass('hide');
                    $MnemomicImageButton.addClass('hide');
                }
                ;
                $DayHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);
                // Countdown and slide
                var count = countdown;
                var length = MnemomicImages.length;
                var clear = [$DayHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];
                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $DayHTML, MnemomicImages, countdown, length, count, clear);
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
        return Days;
    })(mnemonicApp.GameEngine);
    mnemonicApp.Days = Days;
})(mnemonicApp || (mnemonicApp = {}));
