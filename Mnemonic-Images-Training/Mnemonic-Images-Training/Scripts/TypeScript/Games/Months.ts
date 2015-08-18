/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Months extends GameEngine {

        private practiceObject = {
            Month: "Laddar...",
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
                this.renderStartpage('../../Templates/Months/startpage.template', () => {
                    this.setupDropdownMenus(["firstMonth", "lastMonth"], this.mnemonicImages.getMonthsImages());
                    this.playground = $("#playground");
                    this.playgroundSetup();
                });
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private playgroundSetup() {
            this.renderPlayground('../../Templates/Months/practice.template', this.practiceObject, () => { this.practiceSetup(); });
        }

        private practiceSetup() {
            try {
                const $MonthHTML: JQuery = $("#Month");
                const $FirstMonthHTML: JQuery = $("#firstMonth");
                const $LastMonthHTML: JQuery = $("#lastMonth");
                const $Mode: JQuery = $("#mode");
                const $CountdownHTML: JQuery = $("#countdown");
                
                var random: boolean = false;

                if ($Mode.val() == 1) {
                    random = true;
                };

                if (isNaN(+$FirstMonthHTML.val()) || isNaN(+$LastMonthHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");

                if ($FirstMonthHTML.val() === "" || $LastMonthHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");

                if (+$FirstMonthHTML.val() > +$LastMonthHTML.val())
                    throw new RangeError("Första månaden måste komma före andra månaden!");

                var MnemomicImages: string[][] = this.mnemonicImages.getMonthsImages(+$FirstMonthHTML.val(), +$LastMonthHTML.val(), random);

                this.practiceRun($MonthHTML, MnemomicImages);
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