/*
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		25/05/2022
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * */
const KsMf = require('ksmf');

class DataController extends KsMf.app.Controller {

    async init() {
        //... Define logger service as global for his controller
        this.logger = this.helper.get('logger');
        //... Define user service as global for his controller
        this.srvTropiPay = this.helper.get('TropiPay');
    }

    /**
     * @description Obtain contries 
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async getCountry(req, res, next) {
        const data = await this.srvTropiPay.getCountries();
        res.status(200).json(data);
    }

    /**
     * @description Obtain contries 
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async getOccupations(req, res, next) {
        const data = await this.srvTropiPay.getOccupations();
        res.status(200).json(data);
    }

    /**
     * @description Obtain contries 
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async getLocations(req, res, next) {
        const data = await this.srvTropiPay.getLocations();
        res.status(200).json(data);
    }

}
module.exports = DataController;