export class App {
  configureRouter(config, router) {
    config.title = 'Hackathon Planner';
    config.map([{
      route: [''],
      name: 'overview',
      moduleId: 'overview',
      nav: false,
      title: 'Overview'
    }, {
      route: ['ideas'],
      name: 'ideas',
      moduleId: 'ideas',
      nav: false,
      title: 'Hackathon Ideas'
    }, {
      route: 'ideas/:id',
      name: 'ideaDetail',
      moduleId: 'idea-card-detail'
    }, ]);

    this.router = router;
  }
}
