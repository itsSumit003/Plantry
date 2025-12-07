const http = require("http");
http
  .get("http://localhost:5174", (res) => {
    let d = "";
    res.on("data", (c) => (d += c));
    res.on("end", () => {
      console.log(d.slice(0, 4000));
    });
  })
  .on("error", (e) => {
    console.error("ERR", e.message);
    process.exit(1);
  });
