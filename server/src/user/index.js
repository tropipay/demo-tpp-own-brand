/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		20/08/2021
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');
class UserModule extends KsMf.app.Module {
    /**
     * @description define custom url
     */
     initConfig() {
        this.prefix = "/api/v1" + this.prefix;
        this.routes = [{
            route: this.prefix + "/signin",
            controller: 'DefaultController',
            action: 'signin',
            method: 'get'
        }, {
            route: this.prefix + "/callback/login",
            controller: 'DefaultController',
            action: 'login',
            method: 'post'
        }, {
            route: this.prefix + "/validate",
            controller: 'DefaultController',
            action: 'validate',
            method: 'post'
        }, {
            route: this.prefix + "/send/code",
            controller: 'DefaultController',
            action: 'sendCode',
            method: 'post'
        }, {
            //...  /api/v1/user/data/country
            route: this.prefix + "/data/country",
            controller: 'DataController',
            action: 'getCountry',
            method: 'get'
        }, {
            //...  /api/v1/user/data/occupations
            route: this.prefix + "/data/occupations",
            controller: 'DataController',
            action: 'getOccupations',
            method: 'get'
        }, {
            //...  /api/v1/user/data/locations
            route: this.prefix + "/data/locations",
            controller: 'DataController',
            action: 'getLocations',
            method: 'get'
        }]; 

    }
}
module.exports = UserModule;