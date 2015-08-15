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
            this.$main = $("main");
            this.$lead = $("p.lead");
            this.leadText = $.parseHTML(leadText);
        }
        About.prototype.init = function () {
            var _this = this;
            try {
                $.get('../Templates/about.template', function (template) {
                    _this.renderContent(template, _this.$main);
                });
                this.$main.empty();
                if (this.$lead.is(":empty")) {
                    this.$lead.append(this.leadText);
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