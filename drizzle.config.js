/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:6mwDAqxp7TiY@ep-ancient-dream-a5402tcp.us-east-2.aws.neon.tech/LexiGen-AI?sslmode=require',
    }
};