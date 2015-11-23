/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="../../typings/mustache/mustache.d.ts" />
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var mnemonicApp;
(function (mnemonicApp) {
    var Names = (function (_super) {
        __extends(Names, _super);
        function Names() {
            _super.call(this);
            this.practiceObject = {
                Item: "Laddar...",
                MnemomicImage: "Laddar...",
                Timer: "Laddar..."
            };
            this.startpageObject = {
                firstItemID: "firstName",
                firstItemDescription: "Första namnet",
                lastItemID: "lastName",
                lastItemDescription: "Sista namnet"
            };
            this.main = $("main");
            this.lead = $("p.lead");
            this.mnemonicImages = new mnemonicApp.mnemonicData;
            this.templates.startpage = '../../Templates/Shared/startpageDropdown.template';
            this.templates.info = '../../Templates/Names/info.template';
        }
        Names.prototype.init = function () {
            var _this = this;
            try {
                this.renderStartpage(this.templates.startpage, this.startpageObject, function () {
                    _this.renderInfo(_this.templates.info, null);
                    _this.setupDropdownMenus([_this.startpageObject.firstItemID, _this.startpageObject.lastItemID], _this.mnemonicImages.getNameImages());
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
            this.renderPlayground(this.templates.practice, this.practiceObject, function () { _this.practiceSetup(); });
        };
        Names.prototype.practiceSetup = function () {
            var _this = this;
            try {
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
                this.practiceRun(MnemomicImages);
            }
            catch (e) {
                this.playground.empty();
                var errorObject = {
                    ErrorMessage: e.message
                };
                $.get(this.templates.error, function (template) {
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
