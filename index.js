const http = require("http");
const app = require("./app");

const port = process.env.port || 3000; //or localhost

const server = http.createServer(app);

server.listen(port, () => {
  console.log("App is running on port number" + port);
});
