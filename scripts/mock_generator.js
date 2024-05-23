#!/usr/bin/env node

const { Client } = require("pg");
const { v4: uuidv4 } = require("uuid");

const databaseConfig = {
  user: "user",
  host: "127.0.0.1",
  database: "pwd",
  password: "abc",
  port: 5432,
};

const client = new Client(databaseConfig);

/**
 * Mock data queries used to generate data for the database
 */
const queries = {
  attributeValues: {
    inserts: (productId) => [
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('0.2', 1, ${productId});`,
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('15', 16, ${productId});`,
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('7', 17, ${productId});`,
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('0.8', 18, ${productId});`,
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('false', 19, ${productId});`,
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('Samsung', 23, ${productId});`,
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('Galaxy S20', 24, ${productId});`,
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('Black', 25, ${productId});`,
      `INSERT INTO attribute_value (value, attribute_id, product_id) VALUES ('Medium', 26, ${productId});`,
    ],
  },
  users: {
    select: "SELECT id FROM user_entity",
    insert: `
    INSERT INTO user_entity (id, authentication_provider, email, first_name, last_name, username)
    VALUES ($1, $2, $3, $4, $5, $6)
  `,
    values: (i) => [
      uuidv4(),
      0,
      `email_${i}@example.com`,
      `first_name_${i}`,
      `last_name_${i}`,
      `username_${i}`,
    ],
  },
  products: {
    insert:
      "INSERT INTO product (description, name, price, quantity, sku, slug, category_id, created_by_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
    values: (i, userId) => [
      `description_${i}`,
      `name_${i}`,
      (Math.random() * 100).toFixed(2),
      Math.floor(Math.random() * 100) + 1,
      `sku_${i}`,
      `slug_${i}`,
      Math.floor(Math.random() * 13) + 1,
      userId,
    ],
  },
};

/**
 * Insert mock products into the database. Append a set of predefined product attributes to the products.
 *
 * @param {number} limit The number of products to insert
 */
async function insertProducts(limit) {
  await client.connect();
  console.log("Connected to the database");

  const users = await client.query(queries.users.select);

  for (let i = 0; i < limit; i++) {
    const userId = users.rows[i % users.rowCount].id;
    const productValues = queries.products.values(i, userId);

    client
      .query(queries.products.insert, productValues)
      .then((res) => {
        console.log(`[OK] Product ${i + 1}:`, res.rowCount);

        const productId = res.rows[0].id;

        const attributeValueInserts =
          queries.attributeValues.inserts(productId);

        for (const insertQuery of attributeValueInserts) {
          client
            .query(insertQuery)
            .then(() => console.log(`${productId}-${i + 1}`))
            .catch((e) => console.error(`[ERROR] Attribute ${i + 1}:`, e));
        }
      })
      .catch((err) => console.error(`[ERROR] Product ${i + 1}:`, err));
  }

  console.log("Promises are being resolved...");
}

/**
 * Insert mock users into the database.
 *
 * @param {number} limit The number of users to insert
 */
async function insertUsers(limit) {
  await client.connect();
  console.log("Connected to the database");

  for (let i = 0; i < limit; i++) {
    const userValues = queries.users.values(i);

    client
      .query(queries.users.insert, userValues)
      .then((res) => console.log(`[OK] User ${i + 1}:`, res.rowCount))
      .catch((err) => console.error(`[ERROR] User ${i + 1}:`, err));
  }

  console.log("Promises are being resolved...");
}

/**
 * Uncomment the following lines to generate mock data
 */
// insertProducts(1);
// insertUsers(1);
