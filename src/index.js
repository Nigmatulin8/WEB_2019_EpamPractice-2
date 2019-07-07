import './styles.scss';
import Router from './comp/Router.js';
import Route from './comp/Route.js';

init();

function init() {
    var router = new Router([
        new Route('microphone', '../views/microphone.html', true),
		new Route('voices', '../views/voices.html'),
	    new Route('streaming', '../views/streaming.html')
	]);
}