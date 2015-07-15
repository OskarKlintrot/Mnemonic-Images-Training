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
            MnemomicImage: "Laddar..."
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

                var random: boolean = false;

                if ($Mode.val() == 1) {
                    random = true;
                };

                if (isNaN(+$FirstNumberHTML.val()) || isNaN(+$LastNumberHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");

                var test: string[][] = this.mnemonicImages.getNumberImages(+$FirstNumberHTML.val(), +$LastNumberHTML.val(), random);

                test.forEach(function (element, index, array) {
                    console.log(element[0] + ": " + element[1]);
                });

                var temp: string = test[0][0];
                var mek: string = test[0][1];

                $NumberHTML.text(temp);
                $MnemomicImageHTML.text(mek);
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