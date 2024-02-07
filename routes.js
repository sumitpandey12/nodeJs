const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    //read message.txt file
    let message = "";
    const readStream = fs.createReadStream("message.txt");
    readStream.on("data", (chunk) => {
      message = chunk.toString();
      res.write("<html>");
      res.write("<head><title>My First Page</title></head>");
      res.write(
        `<body><p>${message}</p><form action='/message' method='POST'><input type='text' name='message'/><button type='submit'>Send</button></form></body>`
      );
      res.write("</html>");
      return res.end();
    });
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
};

module.exports = requestHandler;
