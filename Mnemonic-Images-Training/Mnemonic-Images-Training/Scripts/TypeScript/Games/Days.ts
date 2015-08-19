/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Days extends GameEngine {

        private practiceObject = {
            Day: "Laddar...",
            MnemomicImage: "Laddar...",
            Timer: "Laddar..."
        }

        private startpageObject = {
            firstItemID: "firstDay",
            firstItemDescription: "Första dagen",
            lastItemID: "lastDay",
            lastItemDescription: "Sista dagen"
        }

        constructor() {
            super();
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicData;

            this.templates.startpage = '../../Templates/Shared/startpageDropdown.template';
            this.templates.info = '../../Templates/Days/info.template';
        }

        init() {
            try {
                this.renderStartpage(this.templates.startpage, this.startpageObject, () => {
                    this.renderInfo(this.templates.info, null);
                    this.setupDropdownMenus(["firstDay", "lastDay"], this.mnemonicImages.getDaysImages());
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
                const $FirstDayHTML: JQuery = $("#firstDay");
                const $LastDayHTML: JQuery = $("#lastDay");
                const $Mode: JQuery = $("#mode");
                const $CountdownHTML: JQuery = $("#countdown");

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
                
                var MnemomicImages: string[][] = this.mnemonicImages.getDaysImages(+$FirstDayHTML.val(), +$LastDayHTML.val(), random);

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