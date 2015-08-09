/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class GameEngine {
        private count: number;

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
                    this.clearGameArea(clear);
                    return;
                } else if (length <= 0 && $Mode.val() == 0) {
                    length = MnemomicImages.length;
                };
                countdownTimer;
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
            });
            $StartButton.click(() => {
                countdownTimer = this.countdownTimer(this.count, $TimerHTML);
                setTimeout(() => { $NextHTML.click() }, (this.count + 1) * 1000);

            });
            $StopButton.click(() => {
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
                $("#playground").empty();
            });
            $PauseButton.click(() => {
                console.log("pause, count: " + count + " this.count: " + this.count);
                clearInterval(MnemomicImagesSlider);
                clearInterval(countdownTimer);
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
                $MnemomicImageButton.click(() => { $MnemomicImageButton.text(MnemomicImages[MnemomicImages.length - index][1]); });
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