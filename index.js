const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const PORT = process.env.PORT;
// Sincronizamos los modelos.
conn.sync({ force: false }).then(() => {
  server.listen(PORT || 3001, () => {
    console.log("%s listening at 3001");
  });
});
