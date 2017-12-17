const http = require("http");


module.exports = class RPCProvider {
    constructor(networkConfig) {
        this.network = networkConfig;
        this.messageId = 0;
    }

    send(method, ...params) {
        return new Promise(resolve => {
            let data = {
                jsonrpc: "2.0",
                method, params,
                id: ++this.messageId
            };

            let request = http.request({
                method: "POST",
                host: this.network.host,
                port: this.network.port,
                path: "/"
            }, response => {
                let data = "";

                response.setEncoding("utf8");
                response.on("data", chunk => data += chunk);
                response.on("end", () => resolve(JSON.parse(data)));
            });

            request.write(JSON.stringify(data));
            request.end();
        });
    }
}
