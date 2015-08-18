/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var GameEngine = (function () {
        function GameEngine() {
        }
        GameEngine.prototype.renderContent = function (template, element, templateObject) {
            var rendered = Mustache.render(template, templateObject);
            element.append(rendered);
        };
        GameEngine.prototype.renderStartpage = function (templateURL, callbackFunction) {
            var _this = this;
            var startPageTemplate = "";
            this.lead.empty();
            this.main.empty();
            $.get(templateURL, function (template) {
                _this.renderContent(template, _this.main, null);
                callbackFunction();
            });
        };
        GameEngine.prototype.renderPlayground = function (templateURL, practiceObject, callbackFunction) {
            var _this = this;
            var renderPlayground = function () {
                $.get(templateURL, function (template) {
                    _this.renderContent(template, _this.playground, practiceObject);
                    callbackFunction();
                });
            };
            $("#Start").click(function () {
                if (_this.playground.is(":empty")) {
                    renderPlayground();
                }
                else if ($("#ErrorMessage").length > 0) {
                    console.log($("#ErrorMessage").length > 0);
                    _this.playground.empty();
                    renderPlayground();
                }
                ;
                return false;
            });
        };
        GameEngine.prototype.setupDropdownMenus = function (id, options) {
            $.each(id, function (idKey, idValue) {
                $.each(options, function (optionKey, optionValue) {
                    $('#' + idValue)
                        .append($("<option></option>")
                        .attr("value", optionKey)
                        .text(optionValue[0]));
                });
            });
        };
        ;
        GameEngine.prototype.practiceRun = function ($TargetHTML, MnemomicImages) {
            var $MnemomicImageHTML = $("#MnemomicImage");
            var $MnemomicImageButton = $("#MnemomicImageButton");
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
            if ($Mode.val() == 1) {
                $MnemomicImageHTML.addClass('hide');
                $MnemomicImageButton.removeClass('hide');
            }
            else {
                $MnemomicImageHTML.removeClass('hide');
                $MnemomicImageButton.addClass('hide');
            }
            ;
            $TargetHTML.text(MnemomicImages[0][0]);
            $TimerHTML.text(countdown);
            // Countdown and slide
            var count = countdown;
            var length = MnemomicImages.length;
            var clear = [$TargetHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];
            this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $TargetHTML, MnemomicImages, countdown, length, count, clear);
        };
        ;
        GameEngine.prototype.mnemomicImagesSlider = function ($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $NumberHTML, MnemomicImages, countdown, length, count, clear) {
            var _this = this;
            this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, length);
            var countdownTimer = this.countdownTimer(count, $TimerHTML);
            var MnemomicImagesSlider = setInterval(function () { $NextHTML.click(); }, $CountdownHTML.val() * 1000);
            $NextHTML.click(function () {
                length = length - 1;
                if (length <= 0 && $Mode.val() == 1) {
                    clearInterval(MnemomicImagesSlider);
                    clearInterval(countdownTimer);
                    $("#playground").empty();
                    return;
                }
                else if (length <= 0 && $Mode.val() == 0) {
                    length = MnemomicImages.length;
                }
                else {
                    countdownTimer;
                }
                ;
                $NumberHTML.text(MnemomicImages[MnemomicImages.length - length][0]);
                _this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, length);
                $TimerHTML.text(countdown);
                // Reset intervals
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
                if (length > 0) {
                    countdownTimer = _this.countdownTimer(count, $TimerHTML);
                    MnemomicImagesSlider = setInterval(function () { $NextHTML.click(); }, $CountdownHTML.val() * 1000);
                }
                ;
                return false;
            });
            $StartButton.click(function () {
                countdownTimer = _this.countdownTimer(_this.count, $TimerHTML);
                setTimeout(function () { $NextHTML.click(); }, (_this.count + 1) * 1000);
                return false;
            });
            $StopButton.click(function () {
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
                $("#playground").empty();
                return false;
            });
            $PauseButton.click(function () {
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
                return false;
            });
        };
        ;
        GameEngine.prototype.countdownTimer = function (count, $html) {
            var _this = this;
            var counter = setInterval(function () {
                count = count - 1;
                _this.count = count;
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
        GameEngine.prototype.showOrHideMnemomicImage = function ($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, index) {
            if ($Mode.val() == 1) {
                $MnemomicImageButton.text("Visa »");
                $MnemomicImageButton.click(function () { $MnemomicImageButton.text(MnemomicImages[MnemomicImages.length - index][1]); return false; });
            }
            else {
                $MnemomicImageHTML.text(MnemomicImages[MnemomicImages.length - index][1]);
            }
        };
        ;
        GameEngine.prototype.clearGameArea = function (clear) {
            clear.forEach(function (element, index, array) {
                element.empty();
            });
        };
        ;
        return GameEngine;
    })();
    mnemonicApp.GameEngine = GameEngine;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=GameEngine.js.map