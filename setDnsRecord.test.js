require('dotenv').config();

const setRecord = require('./setDnsRecord');

setRecord(
  process.env.CLOUDFLARE_ZONE_ID,
  process.env.CLOUDFLARE_DNS_RECORD_ID,
  { type: 'A', name: process.env.CLOUDFLARE_RECORD_URL, content: '1.1.1.1', proxied: true },
  (result) => console.log(result)
);
