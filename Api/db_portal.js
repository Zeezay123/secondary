import mysql from "mysql";

// Portal database connection (existing school portal)
export const portalDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "portal_db", // Change to your actual portal database name
});

// Website database connection (your new website)
export const websiteDb = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "staffschool",
});

// Shared connection - defaults to portal for shared tables
export const db = portalDb;
