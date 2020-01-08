const real_fetch = require ('node-fetch');
const fs = require ('fs');

async function fetch(url) {
    if (url.startsWith ("file://")) {
        const file = url.replace ("file://", "/");
        const raw_data = fs.readFileSync(file);
        return {
            arrayBuffer: () => raw_data,
            json: () => JSON.parse (raw_data)
        }
    } else {
        return real_fetch (url);
    }
}

module.exports = fetch;
