/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class About {
        private main: JQuery;
        private presentation: any[];
        private lead: JQuery;
        private leadText: any[];

        constructor() {
            this.main = $("main");
            this.lead = $("p.lead");
            this.presentation = $.parseHTML("<p>Den här sidan är skapad av <a href=\"https://github.com/OskarKlintrot\">Oskar Klintrot</a>.</p>");
            this.leadText = $.parseHTML("Figurkodsträning a lá <a href=\"http://www.themindacademy.se\">mindacademy.se</a>");
        }

        init() {
            try {
                this.main.empty();
                this.main.append(this.presentation);
                if (this.lead.is(":empty")) {
                    this.lead.append(this.leadText);
                };
                
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }
    }
} 