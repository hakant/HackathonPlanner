import {inject} from "aurelia-framework";
import {_} from 'lodash';
import {Tooltips} from '../data/tooltips'

@inject(Tooltips)
export class TooltipService {
    _storageToken = "HackathonPlanner_Tooltips";
    _tooltips = [];

    _tooltipState = [
        {
            type: "Overview",
            display: true
        },
        {
            type: "NewCard",
            display: true
        },
        {
            type: "IdeaCardDetail",
            display: true
        }];

    _tooltipIndex = 0;

    constructor(tooltips) {
        this._tooltips = tooltips.data;
        let tooltipsInLocalStorage = localStorage[this._storageToken];
        if (tooltipsInLocalStorage) {
            this._tooltipState = JSON.parse(tooltipsInLocalStorage);
        }
    }

    DisplayForPage(page) {
        let tooltipState = _.find(this._tooltipState, function (t) { return t.type === page });
        if (!tooltipState || !tooltipState.display) {
            return;
        }

        let tooltipsForPage = _.find(this._tooltips, function (t) { return t.type === page });
        let current = tooltipsForPage.tips[this._tooltipIndex];
        if (typeof (current) == "undefined") {
            this._tooltipIndex = 0;

            this._tooltipState = _.map(this._tooltipState, function (s) {
                if (s.type == page) {
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
        
        this._tooltipIndex++;
        this.SetEventHandlersForTooltip(current, page);
    }
    
    SetEventHandlersForTooltip(tooltip, page){
        $(tooltip.select).on('shown.bs.popover', function () {
            $("div.popover").click(function () {
                $(tooltip.select).popover("hide");
            });
            
            $("#stop-tutorial").click(function () {
                $(tooltip.select).popover("hide");
            });
        });
        
        let me = this;
        
        $(tooltip.select).on('hidden.bs.popover', function () {
            $(tooltip.select).popover('dispose');
            me.DisplayForPage(page);
        });
    }

    UpdateStorage() {
        localStorage[this._storageToken] = JSON.stringify(this._tooltipState);
    }

}