/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var About = (function () {
        function About(leadText) {
            this.renderContent = function (template, main) {
                var rendered = Mustache.render(template, null);
                main.append(rendered);
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.presentation = $.parseHTML("<p>Den här sidan är skapad av <a href=\"https://github.com/OskarKlintrot\">Oskar Klintrot</a>.</p>");
            this.leadText = $.parseHTML(leadText);
        }
        About.prototype.init = function () {
            try {
                console.log(this);
                var that = this;
                $.get('/Templates/about.template', function (template) {
                    that.renderContent(template, that.main);
                });
                this.main.empty();
                if (this.lead.is(":empty")) {
                    this.lead.append(this.leadText);
                }
                ;
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        return About;
    })();
    mnemonicApp.About = About;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=About.js.map