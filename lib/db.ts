import { Client } from "pg";

// Define a type for the PostgreSQL client instance
let client: Client | undefined;

// Ensure the client is connected before making a request
export const getDbClient = (): Client => {
  if (!client) {
    client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT), // Ensure the port is parsed as a number
      ssl: {
        rejectUnauthorized: false, // This is needed for Neon DB and other cloud PostgreSQL services
      },
    });
    client.connect();
  }
  return client;
};
