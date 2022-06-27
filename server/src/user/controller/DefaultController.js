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
        this.srvExternal = this.helper.get('MyAPI');
    }

    /**
     * @description get safe JSON decode
     * @param {OBJECT} payload 
     * @param {STRING} key 
     * @returns 
     */
    getObj(payload, key) {
        try {
            return payload[key] ? JSON.parse(payload[key]) : null;
        }
        catch (error) {
            return null;
        }
    }

    /**
     * @description get users
     * @param {OBJECT} req 
     * @param {OBJECT} res 
     * @param {OBJECT} next 
     */
    async list(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const size = req.query.size;
            const filter = req.query.filter;
            const sort = req.query.sort;
            const result = await this.srvExternal.getUsers(page, size, filter, sort);
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

    async select(req, res, next) {
        res.status(200).json({
            name: 'Julia Robert Anderson',
            email: 'julia.robert@gmail.com',
            age: 12
        });
    }
}
module.exports = DefaultController;