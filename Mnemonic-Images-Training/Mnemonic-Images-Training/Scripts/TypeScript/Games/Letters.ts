/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Letters extends GameEngine {

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
                this.renderStartpage('../../Templates/Letters/startpage.template', () => {
                    this.setupDropdownMenus(["firstLetter", "lastLetter"], this.mnemonicImages.getAlphabetImages());
                    this.playground = $("#playground");
                    this.playgroundSetup();
                });
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private playgroundSetup() {
            this.renderPlayground('../../Templates/Letters/practice.template', this.practiceObject, () => { this.practiceSetup(); });
        }

        private practiceSetup() {
            try {
                const $LetterHTML: JQuery = $("#Letter");
                const $FirstLetterHTML: JQuery = $("#firstLetter");
                const $LastLetterHTML: JQuery = $("#lastLetter");
                const $Mode: JQuery = $("#mode");
                const $CountdownHTML: JQuery = $("#countdown");

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

                var MnemomicImages: string[][] = this.mnemonicImages.getAlphabetImages(+$FirstLetterHTML.val(), +$LastLetterHTML.val(), random);

                this.practiceRun($LetterHTML, MnemomicImages);
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