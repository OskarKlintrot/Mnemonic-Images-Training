/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var GameEngine = (function () {
        function GameEngine() {
            this.result = [];
            this.templates = {
                startpage: null,
                info: null,
                practice: '../../Templates/Shared/practice.template',
                error: '../../Templates/Shared/error.template',
                summary: '../../Templates/Shared/summary.template',
                summaryElement: '../../Templates/Shared/summaryElement.template'
            };
        }
        GameEngine.prototype.renderContent = function (template, element, templateObject) {
            var rendered = Mustache.render(template, templateObject);
            element.append(rendered);
        };
        GameEngine.prototype.renderStartpage = function (templateURL, startpageObject, callbackFunction) {
            var _this = this;
            $("#Result").remove;
            var startPageTemplate = "";
            this.lead.empty();
            this.main.empty();
            $.get(templateURL, function (template) {
                _this.renderContent(template, _this.main, startpageObject);
                callbackFunction();
            });
        };
        GameEngine.prototype.renderInfo = function (templateURL, callbackFunction) {
            var _this = this;
            $.get(templateURL, function (template) {
                _this.renderContent(template, $("#info"), null);
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
                    _this.playground.empty();
                    renderPlayground();
                }
                ;
                return false;
            });
        };
        GameEngine.prototype.renderSummary = function (MnemomicImages) {
            var _this = this;
            var length = 0;
            $.each(this.result, function (index, item) {
                if (item != null)
                    length++;
            });
            var summary = this.result.reduce(function (a, b) { return a + b; });
            var average = Math.round((summary / length) * 10) / 10;
            $.get(this.templates.summary, function (template) {
                _this.renderContent(template, _this.playground, { Average: "Genomsnittslig tid: " + average + " sek" });
                $.each(MnemomicImages, function (key, value) {
                    $.get(_this.templates.summaryElement, function (template) {
                        var timeString = _this.result[key] === null ? value[1] :
                            _this.result[key].toString().length === 1 ? _this.result[key] + ".0 sek" : _this.result[key] + " sek";
                        _this.renderContent(template, $("#Result").children("table").children("tbody"), { Element: value[0], Time: timeString });
                    });
                });
            });
        };
        ;
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
        GameEngine.prototype.practiceRun = function (MnemomicImages) {
            var $ItemHTML = $("#Item");
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
            $ItemHTML.text(MnemomicImages[0][0]);
            $TimerHTML.text(countdown);
            // Countdown and slide
            var count = countdown;
            var length = MnemomicImages.length;
            var clear = [$ItemHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];
            this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $ItemHTML, MnemomicImages, countdown, length, count, clear);
        };
        ;
        GameEngine.prototype.mnemomicImagesSlider = function ($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $NumberHTML, MnemomicImages, countdown, length, count, clear) {
            var _this = this;
            this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, length);
            var countdownTimer = this.countdownTimer(count, $TimerHTML);
            this.timer = new Date();
            var MnemomicImagesSlider = setInterval(function () { $NextHTML.click(); }, $CountdownHTML.val() * 1000);
            $NextHTML.click(function () {
                // Save time for summary
                if ($Mode.val() == 1)
                    _this.resultTimer(MnemomicImages.length - length);
                // Change slide
                length = length - 1;
                if (length <= 0 && $Mode.val() == 1) {
                    clearInterval(MnemomicImagesSlider);
                    clearInterval(countdownTimer);
                    $("#playground").empty();
                    _this.renderSummary(MnemomicImages);
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
                _this.timer = new Date();
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
                _this.result = [];
                return false;
            });
            $PauseButton.click(function () {
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
                return false;
            });
        };
        ;
        GameEngine.prototype.resultTimer = function (index, fail) {
            if (fail === void 0) { fail = false; }
            var passedTime = Math.round((+new Date() - +this.timer) / 100) / 10;
            if (this.result.length === index && !fail)
                this.result[index] = passedTime > 0 ? passedTime : 0;
            else if (fail && index === this.result.length)
                this.result[index] = null;
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
            var _this = this;
            if ($Mode.val() == 1) {
                $MnemomicImageButton.text("Visa »");
                $MnemomicImageButton.click(function () {
                    _this.resultTimer(MnemomicImages.length - index, true);
                    $MnemomicImageButton.text(MnemomicImages[MnemomicImages.length - index][1]);
                    return false;
                });
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