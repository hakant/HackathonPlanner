import materialize from 'materialize-css';
import {ValidationConfig} from 'aurelia-validation';
import {AuthService} from './services/auth-service';
import {TWBootstrapViewStrategy} from 'aurelia-validation';
import {inject} from 'aurelia-framework';
import 'fetch';

export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-materialize-bridge', bridge => bridge.useAll() )
        .plugin('aurelia-dialog')
        .plugin('benib/aurelia-hammer')
        .plugin('aurelia-validation');
    // .plugin('aurelia-validation',
    //     (config) => { config.useViewStrategy(TWBootstrapViewStrategy.AppendToInput); }
    //     );

    //Uncomment the line below to enable animation.
    //aurelia.use.plugin('aurelia-animator-css');
    //if the css animator is enabled, add swap-order="after" to all router-view elements

    //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
    //aurelia.use.plugin('aurelia-html-import-template-loader')

    //aurelia.start().then(a => a.setRoot());
    aurelia.start().then(() => {
        var auth = aurelia.container.get(AuthService);
        let root = auth.isAuthenticated() ? 'app' : 'login';
        aurelia.setRoot(root);
    });
}
