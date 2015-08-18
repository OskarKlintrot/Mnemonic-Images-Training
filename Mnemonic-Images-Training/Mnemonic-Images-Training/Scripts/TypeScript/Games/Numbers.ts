/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Numbers extends GameEngine {
        //private main: JQuery;
        //private playground: JQuery;
        //private lead: JQuery;
        //private mnemonicImages: mnemonicData;

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
                this.renderStartpage('../../Templates/Numbers/startpage.template', () => {
                    this.playground = $("#playground");
                    this.playgroundSetup();
                });
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private playgroundSetup() {
            if ($("#firstNumber").val().length <= 2)
                this.renderPlayground('../../Templates/Numbers/practice.template', this.practiceObject, () => { this.practiceSetup(); });
            else
                this.renderPlayground('../../Templates/Numbers/practiceThreeChar.template', this.practiceObject, () => { this.practiceSetup(); });
        }

        private practiceSetup() {
            try {
                const $NumberHTML: JQuery = $("#Number");
                const $FirstNumberHTML: JQuery = $("#firstNumber");
                const $LastNumberHTML: JQuery = $("#lastNumber");
                const $Mode: JQuery = $("#mode");
                const $CountdownHTML: JQuery = $("#countdown");
                
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

                this.practiceRun($NumberHTML, MnemomicImages);
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