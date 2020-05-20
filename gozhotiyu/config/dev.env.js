'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"http://20.0.0.188:88/yfzb/api/"',
  // API_ROOT: '"http://p224c97841.iask.in/yfzb"',

  // API_ROOT: '""',
  // IMG_URL: '"http://20.0.0.188:88/yfzb/"',

  API_ROOT: '"http://h5.ufengsports.com/yfzb"',
  // IMG_URL: '"http://h5.ufengsports.com/yfzb"',
  // IMG_URL:'"https://xiaopaob2c.oss-cn-shenzhen.aliyuncs.com"',
  IMG_URL:'"https://ufzb.oss-cn-shenzhen.aliyuncs.com"',

  VIDEO_URL: '""'
})
