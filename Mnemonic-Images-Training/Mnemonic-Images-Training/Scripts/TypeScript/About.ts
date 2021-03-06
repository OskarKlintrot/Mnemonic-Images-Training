﻿/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/mustache/mustache.d.ts" />

"use strict";

module mnemonicApp {
    export class About {
        private $main: JQuery;
        private presentation: any[];
        private $lead: JQuery;
        private leadText: any[];

        constructor(leadText: string) {
            this.$main = $("main");
            this.$lead = $("p.lead");
            this.leadText = $.parseHTML(leadText);
        }

        init() {
            try {
                $.get('../Templates/About/about.template', (template: string) => {
                    this.renderContent(template, this.$main);
                });

                this.$main.empty();
                if (this.$lead.is(":empty")) {
                    this.$lead.append(this.leadText);
                };
                
            } catch (e) {
                console.log("An error occurred: " + e.message);
            };
        }

        private renderContent = (template: string, main: JQuery) => {
            var rendered: string = Mustache.render(template, null);
            main.append(rendered);
        }
    }
} 