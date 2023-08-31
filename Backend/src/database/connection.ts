import "dotenv/config";
import sql from "mssql";

const dbSettings = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: "localhost",
  options: {
    enableArithAbort: true,
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

async function getConnection() {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to establish database connection");
  }
}

export { getConnection, sql };
