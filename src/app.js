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
        route: ['teams'],
        name: 'teams',
        moduleId: 'teams',
        nav: false,
        title: 'Hackathon Teams'
      }
    ]);

    this.router = router;
  }
}
