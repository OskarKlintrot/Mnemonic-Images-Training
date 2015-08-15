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
                var startPageTemplate = "";
                this.lead.empty();
                this.main.empty();
                $.get('../../Templates/Numbers/startpage.template', function (template) {
                    _this.renderContent(template, _this.main, null);
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
            var renderPlayground = function () {
                $.get('../../Templates/Numbers/practice.template', function (template) {
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
        Numbers.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $NumberHTML = $("#Number");
                var $MnemomicImageHTML = $("#MnemomicImage");
                var $MnemomicImageButton = $("#MnemomicImageButton");
                var $FirstNumberHTML = $("#firstNumber");
                var $LastNumberHTML = $("#lastNumber");
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
                if (isNaN(+$FirstNumberHTML.val()) || isNaN(+$LastNumberHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                if ($FirstNumberHTML.val() === "" || $LastNumberHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");
                if (+$FirstNumberHTML.val() > +$LastNumberHTML.val())
                    throw new RangeError("Första talet måste vara mindre än andra talet!");
                var MnemomicImages = this.mnemonicImages.getNumberImages(+$FirstNumberHTML.val(), +$LastNumberHTML.val(), random);
                if ($Mode.val() == 1) {
                    $MnemomicImageHTML.addClass('hide');
                    $MnemomicImageButton.removeClass('hide');
                }
                else {
                    $MnemomicImageHTML.removeClass('hide');
                    $MnemomicImageButton.addClass('hide');
                }
                ;
                $NumberHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);
                // Countdown and slide
                var count = countdown;
                var length = MnemomicImages.length;
                var clear = [$NumberHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];
                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $NumberHTML, MnemomicImages, countdown, length, count, clear);
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
//# sourceMappingURL=Numbers.js.map