export class App {

    configureRouter(config, router) {
        config.title = 'Hackathon Planner';
        config.map([
            {
                route: [''],
                name: 'overview',
                moduleId: 'overview',
                nav: false,
                title: 'Overview'
            },
            {
                route: 'detail/:id',
                name: 'overviewDetail',
                nav: false,
                moduleId: 'overview-detail'
            },
            {
                route: ['ideas'],
                name: 'ideas',
                moduleId: 'ideas',
                nav: false,
                title: 'Hackathon Ideas'
            },
            {
                route: 'ideas/:id',
                name: 'ideaDetail',
                nav: false,
                moduleId: 'idea-card-detail'
            },
            {
                route: 'new-idea',
                name: 'newIdea',
                nav: false,
                title: 'New Idea',
                moduleId: 'new-card'
            }
            ]);

        this.router = router;
    }
}
