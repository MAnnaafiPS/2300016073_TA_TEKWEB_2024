const jsonServer = require("json-server");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "members.json")); // Pastikan file members.json ada
const middlewares = jsonServer.defaults();

// Gunakan middleware bawaan json-server
server.use(middlewares);

// Gunakan router json-server
server.use(router);

// Jalankan server di port 5000
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`JSON Server is running at http://localhost:${PORT}`);
});
