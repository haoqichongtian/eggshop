'use strict';

const Service = require('egg').Service;

/**
 * HomeService Api Service
 */
class HomeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.config = this.ctx.app.config.home;
    this.serverUrl = this.config.serverUrl;
  }

  /**
   * request hacker-news api
   * @param {String} api - Api name
   * @param {Object} [opts] - urllib options
   * @return {Promise} response.data
   */
  async request(api, opts) {
    const options = Object.assign({
      dataType: 'json',
      timeout: [ '30s', '30s' ],
    }, opts);

    const result = await this.ctx.curl(`${this.serverUrl}/${api}`, options);
    return result.data;
  }

  /**
   * get top story ids
   * @param {Number} [page] - page number, 1-base
   * @param {Number} [pageSize] - page count
   * @return {Promise} id list
   */
  async getBanner(id) {
    let banner = await this.app.model.Banner.findAll({
      include: 
        {
          model: this.app.model.BannerItem,
          where: {
            banner_id: id
          },
          include:{
            model: this.app.model.Image,
          }
        },
    });
    return { banner };
    
  }

  /**
   * query item
   * @param {Number} id - itemId
   * @return {Promise} item info
   */
  async getItem(id) {
    return this.request(`item/${id}.json`);
  }

  /**
   * get user info
   * @param {Number} id - userId
   * @return {Promise} user info
   */
  async getUser(id) {
    return this.request(`user/${id}.json`);
  }
}

module.exports = HomeService;

