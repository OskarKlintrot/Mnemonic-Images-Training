/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Days extends GameEngine {
        private main: JQuery;
        private playground: JQuery;
        private lead: JQuery;
        private mnemonicImages: mnemonicData;

        private practiceObject = {
            Day: "Laddar...",
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
                $.get('../../Templates/Days/startpage.template', (template: string) => {
                    this.renderContent(template, this.main, null);
                    this.setupDropdownMenus("firstDay", this.mnemonicImages.getDaysImages());
                    this.setupDropdownMenus("lastDay", this.mnemonicImages.getDaysImages());
                    this.playground = $("#playground");
                    this.playgroundSetup();
                });
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private playgroundSetup() {
            var renderPlayground = () => {
                $.get('../../Templates/Days/practice.template', (template: string) => {
                    this.renderContent(template, this.playground, this.practiceObject);
                    this.practiceSetup();
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

        private practiceSetup() {
            try {
                const $DayHTML: JQuery = $("#Day");
                const $MnemomicImageHTML: JQuery = $("#MnemomicImage");
                const $MnemomicImageButton: JQuery = $("#MnemomicImageButton");
                const $FirstDayHTML: JQuery = $("#firstDay");
                const $LastDayHTML: JQuery = $("#lastDay");
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

                if (isNaN(+$FirstDayHTML.val()) || isNaN(+$LastDayHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");

                if ($FirstDayHTML.val() === "" || $LastDayHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");

                if (+$FirstDayHTML.val() > +$LastDayHTML.val())
                    throw new RangeError("Första dagen måste komma före andra dagen!");

                console.log($FirstDayHTML.val());

                var MnemomicImages: string[][] = this.mnemonicImages.getDaysImages(+$FirstDayHTML.val(), +$LastDayHTML.val(), random);

                if ($Mode.val() == 1) {
                    $MnemomicImageHTML.addClass('hide');
                    $MnemomicImageButton.removeClass('hide');
                } else {
                    $MnemomicImageHTML.removeClass('hide');
                    $MnemomicImageButton.addClass('hide');
                };

                $DayHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);

                // Countdown and slide
                var count: number = countdown;
                var length: number = MnemomicImages.length;
                var clear: JQuery[] = [$DayHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];

                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML,
                    $DayHTML, MnemomicImages, countdown, length, count, clear);
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