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

        public renderContent(template: string, element: JQuery, templateObject: any) {
            var rendered: string = Mustache.render(template, templateObject);
            element.append(rendered);
        }

        public renderStartpage(templateURL: string, callbackFunction: () => void) {
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
                    console.log($("#ErrorMessage").length > 0);
                    this.playground.empty();
                    renderPlayground();
                };

                return false;
            });
        }

        public setupDropdownMenus(id: string, options: string[][]) {
            $.each(options, function (key, value) {
                $('#' + id)
                    .append($("<option></option>")
                        .attr("value", key)
                        .text(value[0]));
            });
        };

        public mnemomicImagesSlider($Mode: JQuery, $MnemomicImageHTML: JQuery, $MnemomicImageButton: JQuery,
            $TimerHTML: JQuery, $NextHTML: JQuery, $StartButton: JQuery, $PauseButton: JQuery, $StopButton: JQuery,
            $CountdownHTML: JQuery, $NumberHTML: JQuery,
            MnemomicImages: string[][], countdown: number, length: number, count: number, clear: JQuery[]) {
            this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, $MnemomicImageButton, MnemomicImages, length);

            var countdownTimer: number = this.countdownTimer(count, $TimerHTML);

            var MnemomicImagesSlider = setInterval(() => { $NextHTML.click() }, $CountdownHTML.val() * 1000);
            $NextHTML.click(() => {
                length = length - 1;
                if (length <= 0 && $Mode.val() == 1) {
                    clearInterval(MnemomicImagesSlider);
                    clearInterval(countdownTimer);
                    $("#playground").empty();
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

                return false;
            });
            $PauseButton.click(() => {
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);

                return false;
            });
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
                $MnemomicImageButton.click(() => { $MnemomicImageButton.text(MnemomicImages[MnemomicImages.length - index][1]); return false; });
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