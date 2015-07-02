/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var mnemonicApp;
(function (mnemonicApp) {
    var Numbers = (function () {
        function Numbers() {
            this.practiceObject = {
                Number: "Laddar...",
                MnemomicImage: "Laddar..."
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
        }
        Numbers.prototype.init = function () {
            try {
                this.lead.empty();
                this.main.empty();
                var that = this;
                $.get('../../Templates/Numbers/startpage.template', function (template) {
                    that.renderContent(template, that.main, null);
                    that.playground = $("#playground");
                    that.startpageSetup();
                });
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        Numbers.prototype.renderContent = function (template, main, templateObject) {
            var rendered = Mustache.render(template, templateObject);
            main.append(rendered);
        };
        Numbers.prototype.startpageSetup = function () {
            var that = this;
            var renderPlayground = function () {
                $.get('../../Templates/Numbers/practice.template', function (template) {
                    that.renderContent(template, that.playground, that.practiceObject);
                    that.practiceSetup();
                });
            };
            $("#Start").click(function () {
                if (that.playground.is(":empty")) {
                    renderPlayground();
                }
                else {
                    that.playground.empty();
                    renderPlayground();
                }
                ;
            });
        };
        Numbers.prototype.practiceSetup = function () {
            try {
                var that = this;
                var NumberHTML = $("#Number");
                var MnemomicImageHTML = $("#MnemomicImage");
                var FirstNumberHTML = $("#firstNumber");
                var LastNumberHTML = $("#lastNumber");
                var LearningHTML = $("#Learning");
                var Mode = $("#mode");
                var Training = $("#Training");
                var TimerHTML = $("#Timer");
                var random = false;
                if (Mode.val() == 1) {
                    random = true;
                }
                ;
                if (isNaN(+FirstNumberHTML.val()) || isNaN(+LastNumberHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                var test = this.mnemonicImages.getNumberImages(+FirstNumberHTML.val(), +LastNumberHTML.val(), random);
                test.forEach(function (element, index, array) {
                    console.log(element[0] + ": " + element[1]);
                });
                var temp = test[0][0];
                var mek = test[0][1];
                NumberHTML.text(temp);
                MnemomicImageHTML.text(mek);
            }
            catch (e) {
                this.playground.empty();
                var errorObject = {
                    ErrorMessage: e.message
                };
                var that = this;
                $.get('../../Templates/error.template', function (template) {
                    that.renderContent(template, that.playground, errorObject);
                });
            }
            ;
        };
        ;
        return Numbers;
    })();
    mnemonicApp.Numbers = Numbers;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=Numbers.js.map