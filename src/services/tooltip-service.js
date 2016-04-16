import {_} from 'lodash';

export class TooltipService {
    _storageToken = "HackathonPlanner_Tooltips";
    _tooltips = [{
        type: "Overview",
        tips: [{
            select: ".navbar",
            title: "Welcome to Hackathon Planner!",
            content: "These tips are designed to help you get up and running in seconds and then they'll get out of the way. Click on the tooltips to move forward.",
            placement: "bottom"
        }, {
                select: "button",
                title: "Add new Hackathon Idea",
                content: "Click this button to add a new idea of your own. You can add as many ideas as you like.",
                placement: "bottom"
            }, {
                select: "div.card:first .card-text",
                title: "Title and Overview",
                content: "Every Hackathon idea has to have a title and a quick overview",
                placement: "bottom"
            }, {
                select: "div.card:first .team-count",
                title: "Joining a Team",
                content: "If you want to join a team, just click on this plus button. You can always change your mind later.",
                placement: "right"
            }, {
                select: "div.card:first i:last",
                title: "Like an Idea",
                content: "Hackathon Projects need likes. Only if they get enough likes, the project owner will be able to pitch the idea on the Hackathon day. So if you like a project idea, do not hesitate to like it!",
                placement: "bottom"
            }]
    },
        {
            type: "NewCard",
            tips: [{
                select: "#new-card input.card-title",
                title: "Project Title",
                content: "Please make sure you add a project title that is concise and clear.",
                placement: "bottom"
            }, {
                    select: "#new-card textarea.card-overview",
                    title: "Project Overview",
                    content: "Overview is displayed directly on the hackathon idea cards and they can't be longer than 300 chars. You'll also get a chance to write a longer description for your project so make sure the overview doesn't go into too many details.",
                    placement: "bottom"
                }]
        }];

    _tooltipState = [{
        type: "Overview",
        display: true
    },{
        type: "NewCard",
        display: true
    }];

    _tooltipIndex = 0;


    constructor() {
        let tooltipsInLocalStorage = localStorage[this._storageToken];
        if (tooltipsInLocalStorage) {
            this._tooltipState = JSON.parse(tooltipsInLocalStorage);
        }
    }

    DisplayForPage(page) {
        let tooltipState = _.find(this._tooltipState, function (t) { return t.type === page });
        if (!tooltipState || !tooltipState.display){
            return;
        }
        
        let tooltipsForPage = _.find(this._tooltips, function (t) { return t.type === page });
        let current = tooltipsForPage.tips[this._tooltipIndex];
        if (typeof (current) == "undefined") {
            this._tooltipIndex = 0;
            
            this._tooltipState = _.map(this._tooltipState, function(s){
               if (s.type == page){
                   s.display = false;
               }
               
               return s;
            });
            
            this.UpdateStorage();
            return;
        }

        current.trigger = "manual";         // set the popover trigger to manual (only js)
        // current.template =
        //     '<div class="popover" role="tooltip">' +
        //     '<div class="popover-arrow"></div>' +
        //     '<h3 class="popover-title"></h3>' +
        //     '<div class="popover-content"></div>' +
        //     '<div id="stop-tutorial" style="text-align: center;cursor: pointer">' +
        //     '<span class="label label-danger">Click here to stop the tutorial</span>' +
        //     '</div>' +
        //     '</div>';

        $(current.select).popover(current);
        if (this._tooltipIndex == 0) {
            setTimeout(function () {
                $(current.select).popover("show");
            }, 1000);
        } else {
            $(current.select).popover("show");
        }

        let me = this;

        $(current.select).on('shown.bs.popover', function () {
            $("div.popover").click(function () {
                $(current.select).popover("hide");
            });
            $("#stop-tutorial").click(function () {
                alert("this will also stop the tutorial");
                $(current.select).popover("hide");
            });
        });

        $(current.select).on('hidden.bs.popover', function () {
            $(current.select).popover('dispose');
            me.DisplayForPage(page);
        });

        this._tooltipIndex++;
    }

    UpdateStorage() {
        localStorage[this._storageToken] = JSON.stringify(this._tooltipState);
    }

}