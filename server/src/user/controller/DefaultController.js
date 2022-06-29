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
        const opt = await this.srvTropiPay.getMerchanAccessURL(
            'https://webhook.site/2a262eed-e12a-475d-9a19-a57134292957'
        );
        if (opt && opt.url) {
            res.writeHead(307, { "Location": opt.url });
            res.end();
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
     * @description signup users
     *              https://tpp.stoplight.io/docs/tropipay-api-doc/ZG9jOjEwMDY4ODkx-the-sign-up-process
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async signup(req, res, next) {
        try {

            const payload = {
                "clientTypeId": 0,
                "email": "tieso85@mailinator.com",
                "password": "mypassword",
                "t_c_version": "string",
                "state": 1,
                "kycLevel": null,
                "name": "Tieso",
                "surname": "Perez",
                "birthDate": "1980-12-22",
                "occupationId": 0,
                "otherOccupationDetail": "string",
                "isPublicOffice": true,
                "birthCountryId": "string",
                "documentId": "string",
                "lang": "es",
                "groupId": 0,
                "address": "string",
                "countryDestinationId": "string",
                "city": "Cienfuegos",
                "province": "Cienfuegos",
                "postalCode": "10400",
                "phone": "string",
                "callingCode": "string",
                "validationCode": "string"
            };

            const emailValidation = await this.srvTropiPay.getMerchanUserEmailValidation(payload);
            if (emailValidation.response === 'OK') {
                res.json({
                    data: emailValidation
                })
            }

            res.json(result);
        } catch (error) {
            this.logger.error('list', error);
            res.status(404).json({
                error: {
                    message: error.message,
                    name: error.name
                }
            });
        }
    }

    async validate(req, res, next) {
        const payload = req.body;        
        let result = {};
        if (payload.resource == 'email') {
            result = await this.srvTropiPay.getMerchanSignup(payload);
            console.log('getMerchanSignup', result);
            if(!result || result.error) {
                return res.status(500).json(result);
            }
            result = await this.srvTropiPay.sendPhoneCode(payload);
            console.log('sendPhoneCode', result);
        } else {
            result = await this.srvTropiPay.sendPhoneToken(payload);
            console.log('sendPhoneToken', result);
        }
        res.json(result);
    }

    async sendCode(req, res, next) {
        const payload = req.body;
        const result = await this.srvTropiPay.sendEmailCode(payload);
        res.json(result);
    }

}
module.exports = DefaultController;