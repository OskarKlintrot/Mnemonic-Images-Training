/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Names extends GameEngine {

        private practiceObject = {
            Item: "Laddar...",
            MnemomicImage: "Laddar...",
            Timer: "Laddar..."
        }

        private startpageObject = {
            firstItemID: "firstName",
            firstItemDescription: "Första namnet",
            lastItemID: "lastName",
            lastItemDescription: "Sista namnet"
        }

        constructor() {
            super();
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicData;

            this.templates.startpage = '../../Templates/Shared/startpageDropdown.template';
            this.templates.info = '../../Templates/Names/info.template';
        }

        init() {
            try {
                this.renderStartpage(this.templates.startpage, this.startpageObject, () => {
                    this.renderInfo(this.templates.info, null);
                    this.setupDropdownMenus([this.startpageObject.firstItemID, this.startpageObject.lastItemID], this.mnemonicImages.getNameImages());
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
                const $FirstNameHTML: JQuery = $("#firstName");
                const $LastNameHTML: JQuery = $("#lastName");
                const $Mode: JQuery = $("#mode");
                const $CountdownHTML: JQuery = $("#countdown");

                var random: boolean = false;

                if ($Mode.val() == 1) {
                    random = true;
                };

                if (isNaN(+$FirstNameHTML.val()) || isNaN(+$LastNameHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");

                if ($FirstNameHTML.val() === "" || $LastNameHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");

                if (+$FirstNameHTML.val() > +$LastNameHTML.val())
                    throw new RangeError("Första namnet måste komma före andra namnet!");

                var MnemomicImages: string[][] = this.mnemonicImages.getNameImages(+$FirstNameHTML.val(), +$LastNameHTML.val(), random);

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