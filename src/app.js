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
            },
            {
                route: 'new-idea-admin',
                name: 'newIdeaAdmin',
                nav: false,
                moduleId: 'admin/new-card-admin'
            }
            ]);

        this.router = router;
    }
}
