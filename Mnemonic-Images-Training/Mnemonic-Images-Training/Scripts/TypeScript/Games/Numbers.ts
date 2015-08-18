/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Numbers extends GameEngine {
        private main: JQuery;
        private playground: JQuery;
        private lead: JQuery;
        private mnemonicImages: mnemonicData;

        private practiceObject = {
            Number: "Laddar...",
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
                $.get('../../Templates/Numbers/startpage.template', (template: string) => {
                    this.renderContent(template, this.main, null);
                    this.playground = $("#playground");
                    this.playgroundSetup();
                });
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private playgroundSetup() {
            var renderPlayground = () => {
                if ($("#firstNumber").val().length <= 2)
                    $.get('../../Templates/Numbers/practice.template', (template: string) => {
                        this.renderContent(template, this.playground, this.practiceObject);
                        this.practiceSetup();
                    });
                else
                    $.get('../../Templates/Numbers/practiceThreeChar.template', (template: string) => {
                        this.renderContent(template, this.playground, this.practiceObject);
                        this.practiceSetup();
                    });
            };
            $("#Start").click( () => {
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
                const $NumberHTML: JQuery = $("#Number");
                const $MnemomicImageHTML: JQuery = $("#MnemomicImage");
                const $MnemomicImageButton: JQuery = $("#MnemomicImageButton");
                const $FirstNumberHTML: JQuery = $("#firstNumber");
                const $LastNumberHTML: JQuery = $("#lastNumber");
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

                if (isNaN(+$FirstNumberHTML.val()) || isNaN(+$LastNumberHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");

                if ($FirstNumberHTML.val() === "" || $LastNumberHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");

                if (+$FirstNumberHTML.val() > +$LastNumberHTML.val())
                    throw new RangeError("Första talet måste vara mindre än andra talet!");

                if ($FirstNumberHTML.val().length <= 2)
                    var MnemomicImages: string[][] = this.mnemonicImages.getNumberImages(+$FirstNumberHTML.val(), +$LastNumberHTML.val(), random);

                if ($FirstNumberHTML.val().length > 2)
                    var MnemomicImages: string[][] = this.mnemonicImages.getThreeCharNumberImages(+$FirstNumberHTML.val(), +$LastNumberHTML.val(), random);

                if ($Mode.val() == 1) {
                    $MnemomicImageHTML.addClass('hide');
                    $MnemomicImageButton.removeClass('hide');
                } else {
                    $MnemomicImageHTML.removeClass('hide');
                    $MnemomicImageButton.addClass('hide');
                };

                $NumberHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);

                // Countdown and slide
                var count: number = countdown;
                var length: number = MnemomicImages.length;
                var clear: JQuery[] = [$NumberHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];

                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML,
                    $NumberHTML, MnemomicImages, countdown, length, count, clear);
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