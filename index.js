const setDnsRecord = require('./setDnsRecord');

module.exports.setRecord = (req, res) => {
  const content = req.body.ip;
  const proxied = req.body.proxied === 'true';

  const authorised = req.body.password === process.env.CLOUDFLARE_PROXY_PASSWORD;

  if (!authorised) {
    res.status(401).end();
  } else {
    setDnsRecord(
      process.env.CLOUDFLARE_ZONE_ID,
      process.env.CLOUDFLARE_DNS_RECORD_ID,
      {type: 'A', name: process.env.CLOUDFLARE_RECORD_URL, content, proxied},
      (result) => res.send(result)
    );
  }
};
