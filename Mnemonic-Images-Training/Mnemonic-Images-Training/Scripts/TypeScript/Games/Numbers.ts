/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Numbers extends GameEngine {

        private practiceObject = {
            Number: "Laddar...",
            MnemomicImage: "Laddar...",
            Timer: "Laddar..."
        }

        private startpageObject = {
            firstItemID: "firstNumber",
            firstItemDescription: "Första talet",
            lastItemID: "lastNumber",
            lastItemDescription: "Sista talet"
        }

        constructor() {
            super();
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicData;

            this.templates.startpage = '../../Templates/Shared/startpageTextbox.template';
            this.templates.info = '../../Templates/Numbers/info.template';
        }

        init() {
            try {
                this.renderStartpage(this.templates.startpage, this.startpageObject, () => {
                    this.renderInfo(this.templates.info, null);
                    this.playground = $("#playground");
                    this.playgroundSetup();
                });
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private playgroundSetup() {
            this.renderPlayground(this.templates.practice, this.practiceObject, () => { this.practiceSetup(); });
        }

        private practiceSetup() {
            try {
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

                this.practiceRun(MnemomicImages);
            }
            catch (e) {
                this.playground.empty();

                var errorObject = {
                    ErrorMessage: e.message
                };

                $.get(this.templates.error, (template: string) => {
                    this.renderContent(template, this.playground, errorObject);
                });
            };
        };
    }
}