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
                var $FirstNumberHTML = $("#firstNumber");
                var $LastNumberHTML = $("#lastNumber");
                var $LearningHTML = $("#Learning");
                var $Mode = $("#mode");
                var $Training = $("#Training");
                var $TimerHTML = $("#Timer");
                var $Countdown = $("#countdown");
                var countdown = $Countdown.val() - 1;
                var random = false;
                if ($Mode.val() == 1) {
                    random = true;
                }
                ;
                if (isNaN(+$FirstNumberHTML.val()) || isNaN(+$LastNumberHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                var MnemomicImages = this.mnemonicImages.getNumberImages(+$FirstNumberHTML.val(), +$LastNumberHTML.val(), random);
                //MnemomicImages.forEach(function (element, index, array) {
                //    console.log(element[0] + ": " + element[1]);
                //});
                $NumberHTML.text(MnemomicImages[0][0]);
                $MnemomicImageHTML.text(MnemomicImages[0][1]);
                $TimerHTML.text(countdown);
                // Countdown and slide
                var count = countdown;
                var length = MnemomicImages.length;
                var clear = [$NumberHTML, $MnemomicImageHTML, $TimerHTML];
                this.countdownTimer(count, $TimerHTML);
                var MnemomicImagesSlider = setInterval(function () {
                    length = length - 1;
                    if (length <= 0) {
                        clearInterval(MnemomicImagesSlider);
                        clear.forEach(function (element, index, array) {
                            console.log("clear: " + element);
                            element.empty();
                        });
                        return;
                    }
                    ;
                    _this.countdownTimer(count, $TimerHTML);
                    $NumberHTML.text(MnemomicImages[MnemomicImages.length - length][0]);
                    $MnemomicImageHTML.text(MnemomicImages[MnemomicImages.length - length][1]);
                    $TimerHTML.text(countdown);
                }, $Countdown.val() * 1000);
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
        };
        ;
        return Numbers;
    })();
    mnemonicApp.Numbers = Numbers;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=Numbers.js.map