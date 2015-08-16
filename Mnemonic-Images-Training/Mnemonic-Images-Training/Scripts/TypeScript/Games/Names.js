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
                var startPageTemplate = "";
                this.lead.empty();
                this.main.empty();
                $.get('../../Templates/Names/startpage.template', function (template) {
                    _this.renderContent(template, _this.main, null);
                    _this.setupDropdownMenus("firstName", _this.mnemonicImages.getNameImages());
                    _this.setupDropdownMenus("lastName", _this.mnemonicImages.getNameImages());
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
            var renderPlayground = function () {
                $.get('../../Templates/Names/practice.template', function (template) {
                    _this.renderContent(template, _this.playground, _this.practiceObject);
                    _this.practiceSetup();
                });
            };
            $("#Start").click(function () {
                if (_this.playground.is(":empty")) {
                    renderPlayground();
                }
                else {
                }
                ;
            });
        };
        Names.prototype.practiceSetup = function () {
            var _this = this;
            try {
                var $NameHTML = $("#Name");
                var $MnemomicImageHTML = $("#MnemomicImage");
                var $MnemomicImageButton = $("#MnemomicImageButton");
                var $FirstNameHTML = $("#firstName");
                var $LastNameHTML = $("#lastName");
                var $LearningHTML = $("#Learning");
                var $Mode = $("#mode");
                var $Training = $("#Training");
                var $TimerHTML = $("#Timer");
                var $CountdownHTML = $("#countdown");
                var $NextHTML = $("#Next");
                var $StartButton = $("#Start");
                var $PauseButton = $("#Pause");
                var $StopButton = $("#Stop");
                var countdown = $CountdownHTML.val() - 1;
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
                console.log($FirstNameHTML.val());
                var MnemomicImages = this.mnemonicImages.getNameImages(+$FirstNameHTML.val(), +$LastNameHTML.val(), random);
                if ($Mode.val() == 1) {
                    $MnemomicImageHTML.addClass('hide');
                    $MnemomicImageButton.removeClass('hide');
                }
                else {
                    $MnemomicImageHTML.removeClass('hide');
                    $MnemomicImageButton.addClass('hide');
                }
                ;
                $NameHTML.text(MnemomicImages[0][0]);
                $TimerHTML.text(countdown);
                // Countdown and slide
                var count = countdown;
                var length = MnemomicImages.length;
                var clear = [$NameHTML, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML];
                this.mnemomicImagesSlider($Mode, $MnemomicImageHTML, $MnemomicImageButton, $TimerHTML, $NextHTML, $StartButton, $PauseButton, $StopButton, $CountdownHTML, $NameHTML, MnemomicImages, countdown, length, count, clear);
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
