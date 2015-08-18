/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class GameEngine {
        public main: JQuery;
        public playground: JQuery;
        public lead: JQuery;
        public mnemonicImages: mnemonicData;
        private count: number;
        private timer: Date;
        public result: number[] = [];

        public renderContent(template: string, element: JQuery, templateObject: any) {
            var rendered: string = Mustache.render(template, templateObject);
            element.append(rendered);
        }

        public renderStartpage(templateURL: string, callbackFunction: () => void) {
            $("#Result").remove;
            var startPageTemplate: string = "";
            this.lead.empty();
            this.main.empty();
            $.get(templateURL, (template: string) => {
                this.renderContent(template, this.main, null);
                callbackFunction();
            });
        }

        public renderPlayground(templateURL: string, practiceObject: any, callbackFunction: () => void) {
            var renderPlayground = () => {
                $.get(templateURL, (template: string) => {
                    this.renderContent(template, this.playground, practiceObject);
                    callbackFunction();
                });
            };
            $("#Start").click(() => {
                if (this.playground.is(":empty")) {
                    renderPlayground();
                } else if ($("#ErrorMessage").length > 0) {
                    this.playground.empty();
                    renderPlayground();
                };

                return false;
            });
        }

        private renderSummary(MnemomicImages: string[][]) {
            var length: number = 0;
            $.each(this.result, (index, item) => {
                if (item != null)
                    length++;
            });
            var summary: number = this.result.reduce(function (a, b) { return a + b; });
            var average: number = Math.round((summary / length) * 10) / 10;
            
            $.get('../../Templates/summary.template', (template: string) => {
                this.renderContent(template, this.playground, { Average: "Genomsnittslig tid: " + average + " sek" });
                $.each(MnemomicImages, (key, value) => {
                    $.get('../../Templates/summaryElement.template', (template: string) => {
                        var timeString: string = this.result[key] === null ? " - " : Math.round(this.result[key]) + " sek";
                        this.renderContent(template, $("#Result").children("table").children("tbody"), { Element: value[0], Time: timeString });
                    });
                });
            });
        };

        public setupDropdownMenus(id: string[], options: string[][]) {
            $.each(id, function (idKey, idValue) {
                $.each(options, function (optionKey, optionValue) {
                    $('#' + idValue)
                        .append($("<option></option>")
                            .attr("value", optionKey)
                            .text(optionValue[0]));
                });
            });
        };

        public practiceRun($TargetHTML: JQuery, MnemomicImages: string[][]) {
            const $MnemomicImageHTML: JQuery = $("#MnemomicImage");
            const $MnemomicImageButton: JQuery = $("#MnemomicImageButton");
            const $LearningHTML: JQuery = $("#Learning");
            const $Mode: JQuery = $("#mode");
            const $Training: JQuery = $("#Training");
            const $TimerHTML: JQuery = $("#Timer");
            const $CountdownHTML: JQuery = $("#countdown");
            const $NextHTML: JQuery = $("#Next");
            const $StartButton: JQuery = $("#Start");
            const $PauseButton: JQuery = $("#Pause");
            const $StopButton: JQuery = $("#Stop");
            const countdown: number = $CountdownHTML.val() - 1;

            if ($Mode.val() == 1) {
                $MnemomicImageHTML.addClass('hide');
                $MnemomicImageButton.removeClass('hide');
            } else {
                $MnemomicImageHTML.removeClass('hide');
                $MnemomicImageButton.addClass('hide');
            };

            $TargetHTML.text(MnemomicImages[0][0]);
            $TimerHTML.text(countdown);

            // Countdown and slide
            var count: number = countdown;
            var length: number = MnemomicImages.length;
            var clear: JQuery[] = [$TargetHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];

            this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML,
                $TargetHTML, MnemomicImages, countdown, length, count, clear);
        };

        public mnemomicImagesSlider($Mode: JQuery, $MnemomicImageHTML: JQuery, $MnemomicImageButton: JQuery,
            $TimerHTML: JQuery, $NextHTML: JQuery, $StartButton: JQuery, $PauseButton: JQuery, $StopButton: JQuery,
            $CountdownHTML: JQuery, $NumberHTML: JQuery,
            MnemomicImages: string[][], countdown: number, length: number, count: number, clear: JQuery[]) {
            this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, length);

            var countdownTimer: number = this.countdownTimer(count, $TimerHTML);

            this.timer = new Date();

            var MnemomicImagesSlider = setInterval(() => { $NextHTML.click() }, $CountdownHTML.val() * 1000);
            $NextHTML.click(() => {
                // Save time for summary
                if ($Mode.val() == 1)
                    this.resultTimer(MnemomicImages.length - length);

                // Change slide
                length = length - 1;
                if (length <= 0 && $Mode.val() == 1) { // If end of training
                    clearInterval(MnemomicImagesSlider);
                    clearInterval(countdownTimer);
                    $("#playground").empty();
                    this.renderSummary(MnemomicImages);
                    return;
                } else if (length <= 0 && $Mode.val() == 0) {
                    length = MnemomicImages.length;
                }
                else {
                    countdownTimer;
                };
                
                $NumberHTML.text(MnemomicImages[MnemomicImages.length - length][0]);
                this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, length);
                $TimerHTML.text(countdown);

                // Reset intervals
                this.timer = new Date();

                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
                if (length > 0) {
                    countdownTimer = this.countdownTimer(count, $TimerHTML);
                    MnemomicImagesSlider = setInterval(() => { $NextHTML.click() }, $CountdownHTML.val() * 1000);
                };

                return false;
            });
            $StartButton.click(() => {
                countdownTimer = this.countdownTimer(this.count, $TimerHTML);
                setTimeout(() => { $NextHTML.click() }, (this.count + 1) * 1000);

                return false;
            });
            $StopButton.click(() => {
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
                $("#playground").empty();

                this.result = [];

                return false;
            });
            $PauseButton.click(() => {
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);

                return false;
            });
        };

        private resultTimer(index: number, fail: boolean = false) {
            var passedTime: number = new Date().getSeconds() - this.timer.getSeconds();
            if (this.result.length === index && !fail)
                this.result[index] = passedTime > 0 ? passedTime : 0;
            else if (fail && index === this.result.length)
                this.result[index] = null;
        };

        private countdownTimer(count: number, $html: JQuery) {
            var counter = setInterval(() => {
                count = count - 1;
                this.count = count;
                if (count < 0) {
                    clearInterval(counter);
                    return;
                };
                $html.text(count);
            }, 1000);

            return counter;
        };

        private showOrHideMnemomicImage($Mode: JQuery, $MnemomicImageHTML: JQuery, $MnemomicImageButton: JQuery, MnemomicImages: string[][], index: number) {
            if ($Mode.val() == 1) {
                $MnemomicImageButton.text("Visa »");
                $MnemomicImageButton.click(() => {
                    this.resultTimer(MnemomicImages.length - index, true);
                    $MnemomicImageButton.text(MnemomicImages[MnemomicImages.length - index][1]);
                    return false;
                });
            }
            else {
                $MnemomicImageHTML.text(MnemomicImages[MnemomicImages.length - index][1]);
            }
        };

        public clearGameArea(clear: JQuery[]) {
            clear.forEach(function (element, index, array) {
                element.empty();
            });
        };
    }
}