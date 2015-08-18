/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mnemonicApp;
(function (mnemonicApp) {
    var Names = (function (_super) {
        __extends(Names, _super);
        function Names() {
            _super.call(this);
            this.practiceObject = {
                Name: "Laddar...",
                MnemomicImage: "Laddar...",
                Timer: "Laddar..."
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
        }
        Names.prototype.init = function () {
            var _this = this;
            try {
                this.renderStartpage('../../Templates/Names/startpage.template', function () {
                    _this.setupDropdownMenus(["firstName", "lastName"], _this.mnemonicImages.getNameImages());
                    _this.playground = $("#playground");
                    _this.playgroundSetup();
                });
            }
            catch (e) {
                console.log("An error occurred: " + e.message);
            }
            ;
        };
        Names.prototype.playgroundSetup = function () {
            var _this = this;
            this.renderPlayground('../../Templates/Names/practice.template', this.practiceObject, function () { _this.practiceSetup(); });
        };
        Names.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $NameHTML = $("#Name");
                var $FirstNameHTML = $("#firstName");
                var $LastNameHTML = $("#lastName");
                var $Mode = $("#mode");
                var $CountdownHTML = $("#countdown");
                var random = false;
                if ($Mode.val() == 1) {
                    random = true;
                }
                ;
                if (isNaN(+$FirstNameHTML.val()) || isNaN(+$LastNameHTML.val()) || isNaN(+$CountdownHTML.val()))
                    throw new RangeError("Inmatningarna måste vara siffror!");
                if ($FirstNameHTML.val() === "" || $LastNameHTML.val() === "" || $CountdownHTML.val() === "")
                    throw new RangeError("Du har glömt att fylla i ett eller flera fält!");
                if (+$FirstNameHTML.val() > +$LastNameHTML.val())
                    throw new RangeError("Första namnet måste komma före andra namnet!");
                var MnemomicImages = this.mnemonicImages.getNameImages(+$FirstNameHTML.val(), +$LastNameHTML.val(), random);
                this.practiceRun($NameHTML, MnemomicImages);
            }
            catch (e) {
                this.playground.empty();
                var errorObject = {
                    ErrorMessage: e.message
                };
                $.get('../../Templates/error.template', function (template) {
                    _this.renderContent(template, _this.playground, errorObject);
                });
            }
            ;
        };
        ;
        return Names;
    })(mnemonicApp.GameEngine);
    mnemonicApp.Names = Names;
})(mnemonicApp || (mnemonicApp = {}));
//# sourceMappingURL=Names.js.map