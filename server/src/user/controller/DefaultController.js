/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		25/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class DefaultController extends KsMf.app.Controller {

    async init() {
        //... Define logger service as global for his controller
        this.logger = this.helper.get('logger');
        //... Define user service as global for his controller
        this.srvTropiPay = this.helper.get('TropiPay');
    }

    /**
     * @description Obtain login URL and rediret to it
     *              https://tpp.stoplight.io/docs/tropipay-api-doc/ZG9jOjEwMDY4ODkw-private-label-login
     *              https://tpp.stoplight.io/docs/tropipay-api-doc/fcf2fd5ed270b-login-workflow-obtain-login-url
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async signin(req, res, next) {
        const redirect = req.query.redirect;
        const opt = await this.srvTropiPay.getMerchanAccessURL(
            'https://webhook.site/2a262eed-e12a-475d-9a19-a57134292957'
        );
        if (opt && opt.url) {
            if (redirect === 'none') {
                return res.status(200).json(opt);
            } else {
                res.writeHead(307, { "Location": opt.url });
                return res.end();
            }
        }
        res.status(200).json(opt);
    }

    /**
     * @description signin callback 
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async login(req, res, next) {
        console.log(req.query);
        console.log(req.body);
        res.status(200).json(req.body);
    }

    /**
     * @description SINGUP users
     *              https://tpp.stoplight.io/docs/tropipay-api-doc/ZG9jOjEwMDY4ODkx-the-sign-up-process
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async validate(req, res, next) {
        const payload = req.body;
        let result = {};
        //... SINGUP STEP 2: email verification and register 
        if (payload.resource == 'email') {
            result = await this.srvTropiPay.getMerchanSignup(payload);
            console.log('getMerchanSignup', result);
            if (!result || result.error) {
                return res.status(500).json({
                    error: {
                        code: 'invalidToken',
                        message: result.error
                    }
                });
            }
            //... SINGUP STEP 4: send code to user phone for it verification 
            result = await this.srvTropiPay.sendPhoneCode(payload);
            console.log('sendPhoneCode', result);
        } else {
            //... SINGUP STEP 5: phone verification and user validation 
            result = await this.srvTropiPay.sendPhoneToken(payload);
            console.log('sendPhoneToken', result);
        }
        if (!result || result.error) {
            return res.status(500).json({
                error: {
                    code: 'invalidToken',
                    message: result.error
                }
            });
        } else {
            res.json(result);
        }
    }

    /**
     * @description SINGUP STEP 1: send code to user email for it verification 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async sendCode(req, res, next) {
        const payload = req.body;
        const result = payload.phone ?
            await this.srvTropiPay.sendPhoneCode(payload) :
            await this.srvTropiPay.sendEmailCode(payload);
        res.json(result);
    }

}
module.exports = DefaultController;