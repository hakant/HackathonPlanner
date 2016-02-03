export class App {
  configureRouter(config, router) {
    config.title = 'Hackathon Planner';
    config.map([
      { route: [''],   name: 'ideas',          moduleId: 'ideas',      nav: false, title: 'Hackathon Ideas' }
    ]);

    this.router = router;
  }
}
