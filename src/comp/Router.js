export default class Router {
    constructor(routes) {
        try {
            if (!routes) {
                throw 'error: routes param is mandatory';
            }

            this.routes = routes;
            this.rootElem = document.getElementById('app');

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
        const xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                that.rootElem.innerHTML = this.responseText;
            }
        };

        xhttp.open('GET', url, true);
        xhttp.send();
    }
}