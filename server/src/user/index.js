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
            route: this.prefix + "/",
            controller: 'DefaultController',
            action: 'signin',
            method: 'get'
        }, {
            route: this.prefix + "/callback/login",
            controller: 'DefaultController',
            action: 'login',
            method: 'post'
        }, {
            route: this.prefix + "/callback/login",
            controller: 'DefaultController',
            action: 'signup',
            method: 'post'
        }]; 
    }
}
module.exports = UserModule;