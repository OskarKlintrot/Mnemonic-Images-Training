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
                var that: Numbers = this;
                $.get('../../Templates/Numbers/startpage.template', function (template: string) {
                    that.renderContent(template, that.main, null);
                    that.playground = $("#playground");
                    that.startpageSetup();
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
            var that: Numbers = this;
            var renderPlayground = function () {
                $.get('../../Templates/Numbers/practice.template', function (template: string) {
                    that.renderContent(template, that.playground, that.practiceObject);
                    that.practiceSetup();
                });
            };
            $("#Start").click(function () {
                if (that.playground.is(":empty")) {
                    renderPlayground();
                } else {
                    that.playground.empty();
                    renderPlayground();
                };
            });
        }

        private practiceSetup() {
            try {
                var that: Numbers = this;

                var NumberHTML: JQuery = $("#Number");
                var MnemomicImageHTML: JQuery = $("#MnemomicImage");
                var FirstNumberHTML: JQuery = $("#firstNumber");
                var LastNumberHTML: JQuery = $("#lastNumber");
                var LearningHTML: JQuery = $("#Learning");
                var Mode: JQuery = $("#mode");
                var Training: JQuery = $("#Training");
                var TimerHTML: JQuery = $("#Timer");

                var random: boolean = false;

                if (Mode.val() == 1) {
                    random = true;
                };

                if (isNaN(+FirstNumberHTML.val()) || isNaN(+LastNumberHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");

                var test: string[][] = this.mnemonicImages.getNumberImages(+FirstNumberHTML.val(), +LastNumberHTML.val(), random);

                test.forEach(function (element, index, array) {
                    console.log(element[0] + ": " + element[1]);
                });

                var temp: string = test[0][0];
                var mek: string = test[0][1];

                NumberHTML.text(temp);
                MnemomicImageHTML.text(mek);
            }
            catch (e) {
                this.playground.empty();

                var errorObject = {
                    ErrorMessage: e.message
                };

                var that: Numbers = this;
                $.get('../../Templates/error.template', function (template: string) {
                    that.renderContent(template, that.playground, errorObject);
                });
            };
        };
    }
}