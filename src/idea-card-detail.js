import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Project} from './models/project';
import {Router} from 'aurelia-router';
import {ProjectService} from './services/project-service';
import {TooltipService} from './services/tooltip-service';
import {jQuery} from "jquery";
import {Finger} from "jquery.finger";
import {_} from 'lodash';

@inject(HttpClient, Router, ProjectService, TooltipService)
export class IdeaCardDetail {
    _titleEditEnabled = false;
    _overviewEditEnabled = false;
    _descrEditEnabled = false;
    _lastProjectTitle = null;
    _lastProjectOverview = null;
    _lastProjectDescription = null;

    @bindable project = undefined;

    constructor(http, router, projectService, tooltipService) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;
        this.router = router;
        this.projectService = projectService;
        this.tooltipService = tooltipService;
    }

    activate(params) {
        // Check if this is result of a click action
        if (params instanceof Project) {
            this.project = params;

            this._lastProjectTitle = this.project._title;
            this._lastProjectOverview = this.project._overview;
            this._lastProjectDescription = this.project._description;

            return;
        }

        // Check if this is result of a deep link
        if (typeof params !== "undefined") {
            this.projectService.getProjects()
                .then(projects => {
                    this.project = _.find(projects, { _id: params.id })

                    this._lastProjectTitle = this.project._title;
                    this._lastProjectOverview = this.project._overview;
                    this._lastProjectDescription = this.project._description;

                    this.showDialog();
                });
        }
    }

    attached() {
        if (typeof this.project !== "undefined") {
            this.showDialog();
        }

        // tooltips still need a bit of polishing.
        //this.tooltipService.DisplayForPage("IdeaCardDetail");
    }

    showDialog() {
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
        $(selector).on('doubletap', function () {
            me._titleEditEnabled = true;
            setTimeout(function () {
                $("input.card-title").select();
            }, 0);
        });
    }

    EnableOverviewEdit(event) {
        var me = this;
        var selector = "div.card-overview"
        $(selector).on('doubletap', function () {
            me._overviewEditEnabled = true;
            setTimeout(function () {
                $("textarea.card-overview").select();
            }, 0);
        });
    }

    EnableDescrEdit(event) {
        if (event.srcElement.nodeName.toLowerCase() == "a") {
            return true;
        }

        var me = this;
        var selector = "div.card-text"
        $(selector).on('doubletap', function () {
            me.DoEnableDescrEditMode();
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
        this.project.validation.validate()
            .then(() => {
                return this.projectService.editProjectTitle(this.project);
            })
            .then((response) => {
                if (typeof response !== "undefined" && response.statusCode === 200) {
                    this.ReflectSaveTitle();
                } else {
                    this.CancelTitle();
                }
            });
    }

    ReflectSaveTitle() {
        this._lastProjectTitle = this.project._title;
        this._titleEditEnabled = false;
    }

    CancelTitle() {
        this.project._title = this._lastProjectTitle;
        this._titleEditEnabled = false;
    }

    SaveOverview() {
        this.project.validation.validate()
            .then(() => {
                return this.projectService.editProjectOverview(this.project);
            })
            .then((response) => {
                if (typeof response !== "undefined" && response.statusCode === 200) {
                    this.ReflectSaveOverview();
                } else {
                    this.CancelOverview();
                }
            });
    }

    ReflectSaveOverview() {
        this._lastProjectOverview = this.project._overview;
        this._overviewEditEnabled = false;
    }

    CancelOverview() {
        this.project._overview = this._lastProjectOverview;
        this._overviewEditEnabled = false;
    }

    SaveDescription() {
        this.projectService.editProjectDescription(this.project)
            .then((response) => {
                if (typeof response !== "undefined" && response.statusCode === 200) {
                    this._lastProjectDescription = this.project._description;
                    this._descrEditEnabled = false;
                } else {
                    this.CancelDescription();
                }
            });
    }

    CancelDescription() {
        this.project._description = this._lastProjectDescription;
        this._descrEditEnabled = false;
    }

    TextAreaAdjust(event) {
        let element = event.srcElement;
        element.style.height = (element.scrollHeight) + "px";
    }

    Like(event) {
        let projectId = this.project._id;
        let projectService = this.projectService;

        projectService.like(this.project)
            .then((response) => {
                if (typeof response !== "undefined" && response.statusCode === 200) {
                    this.project.liked = !this.project.liked
                }
            });
    }

    Join(event) {
        let projectId = this.project._id;
        let projectService = this.projectService;

        let promise;
        if (this.project.joined) {
            promise = projectService.unjoin(this.project);
        } else {
            promise = projectService.join(this.project);
        }

        let me = this;
        promise
        .then((response) => {
            if (typeof response !== "undefined" && response.statusCode === 200) {
                me.project.joined = !me.project.joined;
            }
        });
    }
}
