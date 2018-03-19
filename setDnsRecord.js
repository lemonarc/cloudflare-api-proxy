require('dotenv').config();

const cf = require('cloudflare')({
  email: process.env.CLOUDFLARE_EMAIL,
  key: process.env.CLOUDFLARE_API_KEY,
});

module.exports = (zone_id, id, details, cb) => {
  cf.dnsRecords.edit(zone_id, id, details).then((resp) => {
    cb(resp.result);
  });
};
