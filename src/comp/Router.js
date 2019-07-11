import * as stream from './stream.js';

window.stream = stream;

export default class Router {
    constructor(routes, socket, io) {
        try {
            if (!routes) {
                throw 'error: routes param is mandatory';
            }

            this.routes = routes;
            this.rootElem = document.getElementById('app');

            this.io = io;
            this.socket = socket;

            this.init();
        }
        catch (e) {
            console.error(e);
        }
    }

    init() {
        let r = this.routes;

        window.addEventListener('hashchange', e => {
            this.hasChanged(this, r);
        });

        this.hasChanged(this, r);
    }

    hasChanged(scope, r) {
        if (window.location.hash.length > 0) {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];

                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
        else {
            for (let i = 0, length = r.length; i < length; i++) {
                let route = r[i];

                if(route.default) {
                    scope.goToRoute(route.htmlName);
                }
            }
        }
    }

    goToRoute(htmlName) {
        let url = 'views/' + htmlName;
        const that = this;

        fetch(url, { method: 'get' }).then(response => {
            return response.text();
        }).then(data => {
            that.rootElem.innerHTML = data;

            console.log(url);
            if(url == 'views/../views/streaming.html') {
                console.log(2222);
                window['stream'].initAudio(this.socket);
            }
        });
    }
}