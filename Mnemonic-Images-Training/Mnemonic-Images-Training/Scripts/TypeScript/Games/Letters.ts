/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Letters extends GameEngine {
        private main: JQuery;
        private playground: JQuery;
        private lead: JQuery;
        private mnemonicImages: mnemonicData;

        private practiceObject = {
            Letter: "Laddar...",
            MnemomicImage: "Laddar...",
            Timer: "Laddar..."
        }

        constructor() {
            super();
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicData;
        }

        init() {
            try {
                var startPageTemplate: string = "";
                this.lead.empty();
                this.main.empty();
                $.get('../../Templates/Letters/startpage.template', (template: string) => {
                    this.renderContent(template, this.main, null);
                    this.setupDropdownMenus("firstLetter", this.mnemonicImages.getAlphabetImages());
                    this.setupDropdownMenus("lastLetter", this.mnemonicImages.getAlphabetImages());
                    this.playground = $("#playground");
                    this.playgroundSetup();
                });
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private playgroundSetup() {
            var renderPlayground = () => {
                $.get('../../Templates/Letters/practice.template', (template: string) => {
                    this.renderContent(template, this.playground, this.practiceObject);
                    this.practiceSetup();
                });
            };
            $("#Start").click(() => {
                if (this.playground.is(":empty")) {
                    renderPlayground();
                } else {
                    //this.playground.empty();
                    //renderPlayground();
                };
            });
        }

        private practiceSetup() {
            try {
                const $LetterHTML: JQuery = $("#Letter");
                const $MnemomicImageHTML: JQuery = $("#MnemomicImage");
                const $MnemomicImageButton: JQuery = $("#MnemomicImageButton");
                const $FirstLetterHTML: JQuery = $("#firstLetter");
                const $LastLetterHTML: JQuery = $("#lastLetter");
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

                var random: boolean = false;

                if ($Mode.val() == 1) {
                    random = true;
                };

                if (isNaN(+$FirstLetterHTML.val()) || isNaN(+$LastLetterHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");

                if ($FirstLetterHTML.val() === "" || $LastLetterHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");

                if (+$FirstLetterHTML.val() > +$LastLetterHTML.val())
                    throw new RangeError("Första bokstaven måste komma före andra bokstaven!");

                console.log($FirstLetterHTML.val());

                var MnemomicImages: string[][] = this.mnemonicImages.getAlphabetImages(+$FirstLetterHTML.val(), +$LastLetterHTML.val(), random);

                if ($Mode.val() == 1) {
                    $MnemomicImageHTML.addClass('hide');
                    $MnemomicImageButton.removeClass('hide');
                } else {
                    $MnemomicImageHTML.removeClass('hide');
                    $MnemomicImageButton.addClass('hide');
                };

                $LetterHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);

                // Countdown and slide
                var count: number = countdown;
                var length: number = MnemomicImages.length;
                var clear: JQuery[] = [$LetterHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];

                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML,
                    $LetterHTML, MnemomicImages, countdown, length, count, clear);
            }
            catch (e) {
                this.playground.empty();

                var errorObject = {
                    ErrorMessage: e.message
                };

                $.get('../../Templates/error.template', (template: string) => {
                    this.renderContent(template, this.playground, errorObject);
                });
            };
        };
    }
}