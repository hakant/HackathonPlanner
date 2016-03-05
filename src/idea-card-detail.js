import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Project} from './models/project';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class IdeaCardDetail {
    _titleEditEnabled = false;
    _overviewEditEnabled = false;
    _descrEditEnabled = false;
    _lastProjectTitle = null;
    _lastProjectOverview = null;
    _lastProjectDescription = null;
    project = null;

    constructor(http, router) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;
        this.router = router;
    }

    activate(params) {
        for (let item of window._projects) {
            if (item._id == params.id) {
                this.project = item;
                this._lastProjectTitle = this.project._title;
                this._lastProjectOverview = this.project._overview;
                this._lastProjectDescription = this.project._description;
            }
        }
    }

    attached() {
        var myRouter = this.router;
        $("#card-detail").modal('show');
        $('#card-detail').on('hidden.bs.modal', function () {
            myRouter.navigateToRoute('overview');
        });
    }

    @computedFrom('_titleEditEnabled')
    get TitleEditEnabled() {
        return this._titleEditEnabled;
    }
    
    @computedFrom('_overviewEditEnabled')
    get OverviewEditEnabled() {
        return this._overviewEditEnabled;
    }

    @computedFrom('_descrEditEnabled')
    get DescrEditEnabled() {
        return this._descrEditEnabled;
    }

    get IsDescriptionEmpty() {
        return this._lastProjectDescription === null ||
            this._lastProjectDescription === "";
    }

    EnableTitleEdit(event) {
        var me = this;
        var selector = "h2.card-title"
        $(selector).on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                me._titleEditEnabled = true;
            } else {
                // drag
            }
            $(selector).off('mouseup mousemove', handler);
        });
    }
    
    EnableOverviewEdit(event) {
        var me = this;
        var selector = "div.card-overview"
        $(selector).on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                me._overviewEditEnabled = true;
            } else {
                // drag
            }
            $(selector).off('mouseup mousemove', handler);
        });
    }

    EnableDescrEdit(event) {
        if (event.srcElement.nodeName.toLowerCase() == "a") {
            return true;
        }

        var me = this;
        $("body").on('mouseup mousemove', function handler(evt) {
            if (evt.type === 'mouseup') {
                me.DoEnableDescrEditMode();
            } else {
                // drag
            }
            $("body").off('mouseup mousemove', handler);
        });
    }

    DoEnableDescrEditMode() {
        this._descrEditEnabled = true;

        var selector = `text-${this.project._id}`;
        setTimeout(function () {
            let element = document.getElementById(selector);
            element.style.height = "0px";
            element.style.height = (element.scrollHeight) + "px";
            element.focus();
            element.select();
        }, 0);
    }

    SaveTitle() {
        this._lastProjectTitle = this.project._title;
        this._titleEditEnabled = false;
    }

    CancelTitle() {
        this.project._title = this._lastProjectTitle;
        this._titleEditEnabled = false;
    }
    
    SaveOverview() {
        this._lastProjectOverview = this.project._overview;
        this._overviewEditEnabled = false;
    }

    CancelOverview() {
        this.project._overview = this._lastProjectOverview;
        this._overviewEditEnabled = false;
    }

    SaveDescription() {
        this._lastProjectDescription = this.project._description;
        this._descrEditEnabled = false;
    }

    CancelDescription() {
        this.project._description = this._lastProjectDescription;
        this._descrEditEnabled = false;
    }

    TextAreaAdjust(event) {
        let element = event.srcElement;
        element.style.height = (element.scrollHeight) + "px";
    }

    Like() {
        this.project.liked = !this.project.liked;
    }

    Join() {
        if (this.project.joined) {
            this.project.joined = false;
            // now unjoin from this through the API
        } else {
            // unjoin from whatever you're joined already through the API
            // and join to this
            this.project.joined = true;
        }
    }
}
