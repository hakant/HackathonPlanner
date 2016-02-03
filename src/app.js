export class App {
  configureRouter(config, router) {
    config.title = 'Hackathon Planner';
    config.map([
      { route: ['', 'ideas'],   name: 'ideas',          moduleId: 'ideas',      nav: false, title: 'Hackathon Ideas' },
      { route: 'ideas',         name: 'ideas',        moduleId: 'ideas',        nav: true, title: 'Hackathon Ideas' },
      { route: 'child-router',  name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }
    ]);

    this.router = router;
  }
}
