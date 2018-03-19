# Lemon Arc Cloudflare API Proxy

A tool for allowing third parties needing to edit specific records in your Cloudflare account access to do so without needing to give them account credentials.

## Usage

This project is designed to be used as an HTTP trigger deployed to Google Cloud Platform's cloud functions, but may work with other serverless solutions. It could also in theory be self-hosted. Doing so is left as an exercise to the reader.

To use, send a `POST` request to the URL at which the proxy is hosted, with a content-type header of `application/x-www-form-urlencoded` and the following data:

- `ip` - The IP you wish to set the record to.
- `password` - The password defined in your .env file as `CLOUDFLARE_PROXY_PASSWORD`. If not sent or incorrect, the proxy will return a 401 status and the record will not be set.
- `proxied` (optional - defaults to false) - Whether or not to proxy the record through Cloudflare.

Here's an example request sent through CURL:

```bash
curl -X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'ip=1.2.3.4&proxied=true&password=MySuperSecurePassword' \
https://us-central1-cloudflare-api-proxy.cloudfunctions.net/my-cloud-function
```

## Requirements

To test locally, you need:

- Node v6.11.5+

To deploy to Google Cloud as a cloud function you need:

- The gcloud SDK

## Running locally

Install dependencies:

```bash
npm install
```

Copy the example env file:

```bash
cp .env.example .env
```

Populate with your API details and the details of the specific record you need to provide access to.

Test just setting of the record with:

```bash
node setDnsRecord.test.js
```

This should set your DNS record to 1.1.1.1 and proxy it through cloudflare. **Note: this will edit the live record so test this with the ID of a test record!**

To test it as a Google Cloud Function locally, run:

```bash
npm run functions start
```

To start the local cloud functions emulator, and then deploy to the local emulator with:

```bash
npm run functions deploy cloudflare-proxy -- --entry-point setRecord --trigger-http --source=$(pwd)
```

You can then test the function as so:

```bash
curl -H 'Content-Type: application/x-www-form-urlencoded' -X POST <URL> -d 'ip=1.2.3.4&proxied=true'
```

Where <URL> is the URL that you get back from the local cloud functions emulator after deploying.

## Deployment:

To deploy to Google Cloud Platform, ensure the details in .env are set to edit the correct record, and then run:

```bash
npm run deploy <function-name>
```
