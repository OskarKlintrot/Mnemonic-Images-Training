/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var Numbers = (function () {
        function Numbers() {
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
                this.lead.empty();
                this.main.empty();
                $.get('../../Templates/Numbers/startpage.template', function (template) {
                    _this.renderContent(template, _this.main, null);
                    _this.playground = $("#playground");
                    _this.startpageSetup();
                });
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        Numbers.prototype.renderContent = function (template, main, templateObject) {
            var rendered = Mustache.render(template, templateObject);
            main.append(rendered);
        };
        Numbers.prototype.startpageSetup = function () {
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
                    _this.playground.empty();
                    renderPlayground();
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
                //MnemomicImages.forEach(function (element, index, array) {
                //    console.log(element[0] + ": " + element[1]);
                //});
                $NumberHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);
                // Countdown and slide
                var count = countdown;
                var length = MnemomicImages.length;
                var clear = [$NumberHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];
                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $CountdownHTML, $NumberHTML, MnemomicImages, countdown, length, count, clear);
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
        Numbers.prototype.mnemomicImagesSlider = function ($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $CountdownHTML, $NumberHTML, MnemomicImages, countdown, length, count, clear) {
            var _this = this;
            this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, length);
            var countdownTimer = this.countdownTimer(count, $TimerHTML);
            var MnemomicImagesSlider = setInterval(function () { $NextHTML.click(); }, $CountdownHTML.val() * 1000);
            $NextHTML.click(function () {
                length = length - 1;
                if (length <= 0 && $Mode.val() == 1) {
                    clearInterval(MnemomicImagesSlider);
                    clear.forEach(function (element, index, array) {
                        element.empty();
                    });
                    return;
                }
                else if (length <= 0 && $Mode.val() == 0) {
                    length = MnemomicImages.length;
                }
                ;
                countdownTimer;
                $NumberHTML.text(MnemomicImages[MnemomicImages.length - length][0]);
                _this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, length);
                $TimerHTML.text(countdown);
                // Reset intervals
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
                if (length > 1) {
                    countdownTimer = _this.countdownTimer(count, $TimerHTML);
                    MnemomicImagesSlider = setInterval(function () { $NextHTML.click(); }, $CountdownHTML.val() * 1000);
                }
            });
        };
        ;
        Numbers.prototype.countdownTimer = function (count, $html) {
            var counter = setInterval(function () {
                count = count - 1;
                if (count < 0) {
                    clearInterval(counter);
                    return;
                }
                ;
                $html.text(count);
            }, 1000);
            return counter;
        };
        ;
        Numbers.prototype.showOrHideMnemomicImage = function ($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, index) {
            if ($Mode.val() == 1) {
                $MnemomicImageButton.text("Visa »");
                $MnemomicImageButton.click(function () { $MnemomicImageButton.text(MnemomicImages[MnemomicImages.length - index][1]); });
            }
            else {
                $MnemomicImageHTML.text(MnemomicImages[MnemomicImages.length - index][1]);
            }
        };
        ;
        return Numbers;
    })();
    mnemonicApp.Numbers = Numbers;
})(mnemonicApp || (mnemonicApp = {}));
