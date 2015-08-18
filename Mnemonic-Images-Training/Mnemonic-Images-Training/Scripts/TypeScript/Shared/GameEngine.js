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
        GameEngine.prototype.setupDropdownMenus = function (id, options) {
            $.each(options, function (key, value) {
                $('#' + id)
                    .append($("<option></option>")
                    .attr("value", key)
                    .text(value[0]));
            });
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