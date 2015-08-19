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

        private startpageObject = {
            firstItemID: "firstLetter",
            firstItemDescription: "Första bokstaven",
            lastItemID: "lastLetter",
            lastItemDescription: "Sista bokstaven"
        }

        constructor() {
            super();
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicData;

            this.templates.startpage = '../../Templates/Shared/startpageDropdown.template';
            this.templates.info = '../../Templates/Letters/info.template';
        }

        init() {
            try {
                this.renderStartpage(this.templates.startpage, this.startpageObject, () => {
                    this.renderInfo(this.templates.info, null);
                    this.setupDropdownMenus([this.startpageObject.firstItemID, this.startpageObject.lastItemID], this.mnemonicImages.getAlphabetImages());
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