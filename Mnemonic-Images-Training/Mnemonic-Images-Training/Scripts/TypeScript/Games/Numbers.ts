/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Numbers {
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
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicData;
        }

        init() {
            try {
                this.lead.empty();
                this.main.empty();
                $.get('../../Templates/Numbers/startpage.template', (template: string) => {
                    this.renderContent(template, this.main, null);
                    this.playground = $("#playground");
                    this.startpageSetup();
                });
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private renderContent (template: string, main: JQuery, templateObject: any) {
            var rendered: string = Mustache.render(template, templateObject);
            main.append(rendered);
        }

        

        private startpageSetup() {
            var renderPlayground = () => {
                $.get('../../Templates/Numbers/practice.template', (template: string) => {
                    this.renderContent(template, this.playground, this.practiceObject);
                    this.practiceSetup();
                });
            };
            $("#Start").click( () => {
                if (this.playground.is(":empty")) {
                    renderPlayground();
                } else {
                    this.playground.empty();
                    renderPlayground();
                };
            });
        }

        private practiceSetup() {
            try {
                const $NumberHTML: JQuery = $("#Number");
                const $MnemomicImageHTML: JQuery = $("#MnemomicImage");
                const $FirstNumberHTML: JQuery = $("#firstNumber");
                const $LastNumberHTML: JQuery = $("#lastNumber");
                const $LearningHTML: JQuery = $("#Learning");
                const $Mode: JQuery = $("#mode");
                const $Training: JQuery = $("#Training");
                const $TimerHTML: JQuery = $("#Timer");
                const $CountdownHTML: JQuery = $("#countdown");
                const countdown: number = $CountdownHTML.val() - 1;

                var random: boolean = false;

                if ($Mode.val() == 1) {
                    random = true;
                };

                if (isNaN(+$FirstNumberHTML.val()) || isNaN(+$LastNumberHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");

                if ($FirstNumberHTML.val() === "" || $LastNumberHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");

                var MnemomicImages: string[][] = this.mnemonicImages.getNumberImages(+$FirstNumberHTML.val(), +$LastNumberHTML.val(), random);

                //MnemomicImages.forEach(function (element, index, array) {
                //    console.log(element[0] + ": " + element[1]);
                //});

                $NumberHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);

                // Countdown and slide
                var count: number = countdown;
                var length: number = MnemomicImages.length;
                var clear: JQuery[] = [$NumberHTML, $MnemomicImageHTML, $TimerHTML];

                this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, MnemomicImages, length);

                this.countdownTimer(count, $TimerHTML);
                var MnemomicImagesSlider = setInterval(() => {
                    length = length - 1;
                    if (length <= 0) {
                        clearInterval(MnemomicImagesSlider);
                        clear.forEach(function (element, index, array) {
                            console.log("clear: " + element);
                            element.empty();
                        });
                        return;
                    };
                    this.countdownTimer(count, $TimerHTML);
                    $NumberHTML.text(MnemomicImages[MnemomicImages.length - length][0]);
                    this.showOrHideMnemomicImage($Mode, $MnemomicImageHTML, MnemomicImages, length);
                    $TimerHTML.text(countdown);
                }, $CountdownHTML.val() * 1000);
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

        private countdownTimer(count: number, $html: JQuery) {
            var counter = setInterval(() => {
                count = count - 1;
                if (count < 0) {
                    clearInterval(counter);
                    return;
                };
                $html.text(count);
            }, 1000);
        };

        private showOrHideMnemomicImage($Mode: JQuery, $MnemomicImageHTML: JQuery, MnemomicImages: string[][], index: number) {
        if ($Mode.val() == 1) {
            $MnemomicImageHTML.text("Visa  »");
            $MnemomicImageHTML.click(() => { $MnemomicImageHTML.text(MnemomicImages[MnemomicImages.length - index][1]); });
        }
        else {
            $MnemomicImageHTML.text(MnemomicImages[MnemomicImages.length - index][1]);
        }
    };
    }
}