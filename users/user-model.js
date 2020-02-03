const db = require("../data/db-config.js");

function find() {
  return db("users").select();
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

async function add(userData) {
  const [id] = await db("users").insert(userData);
  return db("users")
    .where({ id })
    .first();
}

async function update(id, body) {
  await db("users")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};
