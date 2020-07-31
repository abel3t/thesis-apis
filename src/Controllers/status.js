'use strict';

module.exports = async (req, res) => {
  return res.json({
    UP_STAGE: process.env.UP_STAGE,
    status: 'OK'
  });
};