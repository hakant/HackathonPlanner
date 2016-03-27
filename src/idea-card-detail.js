import {bindable} from "aurelia-framework";
import {computedFrom} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import {Project} from './models/project';
import {Router} from 'aurelia-router';
import {ApplicationState} from './infrastructure/application-state';
import {_} from 'lodash';

@inject(HttpClient, Router, ApplicationState)
export class IdeaCardDetail {
    _titleEditEnabled = false;
    _overviewEditEnabled = false;
    _descrEditEnabled = false;
    _lastProjectTitle = null;
    _lastProjectOverview = null;
    _lastProjectDescription = null;
    project = null;

    constructor(http, router, state) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('/');
        });

        this.http = http;
        this.router = router;
        this.state = state;
    }

    activate(params) {
        this.state.getProjects()
            .then(projects => {
                this.project = _.find(projects, { _id: parseInt(params.id) })

                this._lastProjectTitle = this.project._title;
                this._lastProjectOverview = this.project._overview;
                this._lastProjectDescription = this.project._description;
            });
    }

    attached() {
        var myRouter = this.router;
        $("#card-detail").modal('show');
        $('#card-detail').on('hidden.bs.modal', function() {
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
                setTimeout(function() {
                    $("input.card-title").select();
                }, 0);
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
                setTimeout(function() {
                    $("textarea.card-overview").select();
                }, 0);
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
        setTimeout(function() {
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
                this.DoSaveTitle();
                this.state.addOrUpdateProject(this.project);
            }).catch(error => {
                if (error.properties._title.IsValid) {
                    this.DoSaveTitle();
                }
            });
    }

    DoSaveTitle() {
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
                this.DoSaveOverview();
                this.state.addOrUpdateProject(this.project);
            }).catch(error => {
                if (error.properties._overview.IsValid) {
                    this.DoSaveOverview();
                }
            });
    }

    DoSaveOverview() {
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
        this.state.addOrUpdateProject(this.project);
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
        this.state.addOrUpdateProject(this.project);
    }

    Join() {
        let projectId = this.project._id;
        let state = this.state;

        this.state.getProjects()
            .then(projects => {
                for (let item of projects) {
                    if (item.joined) {
                        item.joined = false;
                        state.addOrUpdateProject(item);

                        if (item._id == projectId)
                            return;
                    }

                    if (item._id == projectId) {
                        item.joined = !item.joined;
                        state.addOrUpdateProject(item);
                    }
                }
            })
    }
}
