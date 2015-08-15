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
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
        }
        Letters.prototype.init = function () {
            var _this = this;
            try {
                var startPageTemplate = "";
                this.lead.empty();
                this.main.empty();
                $.get('../../Templates/Letters/startpage.template', function (template) {
                    _this.renderContent(template, _this.main, null);
                    _this.setupDropdownMenus("firstLetter", _this.mnemonicImages.getAlphabetImages());
                    _this.setupDropdownMenus("lastLetter", _this.mnemonicImages.getAlphabetImages());
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
            var renderPlayground = function () {
                $.get('../../Templates/Letters/practice.template', function (template) {
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
        Letters.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $LetterHTML = $("#Letter");
                var $MnemomicImageHTML = $("#MnemomicImage");
                var $MnemomicImageButton = $("#MnemomicImageButton");
                var $FirstLetterHTML = $("#firstLetter");
                var $LastLetterHTML = $("#lastLetter");
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
                if (isNaN(+$FirstLetterHTML.val()) || isNaN(+$LastLetterHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                if ($FirstLetterHTML.val() === "" || $LastLetterHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");
                if (+$FirstLetterHTML.val() > +$LastLetterHTML.val())
                    throw new RangeError("Första bokstaven måste komma före andra bokstaven!");
                console.log($FirstLetterHTML.val());
                var MnemomicImages = this.mnemonicImages.getAlphabetImages(+$FirstLetterHTML.val(), +$LastLetterHTML.val(), random);
                if ($Mode.val() == 1) {
                    $MnemomicImageHTML.addClass('hide');
                    $MnemomicImageButton.removeClass('hide');
                }
                else {
                    $MnemomicImageHTML.removeClass('hide');
                    $MnemomicImageButton.addClass('hide');
                }
                ;
                $LetterHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);
                // Countdown and slide
                var count = countdown;
                var length = MnemomicImages.length;
                var clear = [$LetterHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];
                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $LetterHTML, MnemomicImages, countdown, length, count, clear);
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
        return Letters;
    })(mnemonicApp.GameEngine);
    mnemonicApp.Letters = Letters;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=Letters.js.map