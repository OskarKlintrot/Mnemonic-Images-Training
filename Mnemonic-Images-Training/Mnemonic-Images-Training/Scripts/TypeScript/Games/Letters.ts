/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class Letters {
        private main: JQuery;
        private lead: JQuery;

        constructor() {
            this.main = $("main");
            this.lead = $("p.lead");
        }

        init() {
            try {
                this.lead.empty();
                this.main.empty();
                this.main.append(location.hash + ": Dags att öva på bokstäver!");
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }
    }
}