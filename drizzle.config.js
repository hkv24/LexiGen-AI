/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.tsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL
    },
    verbose: true,
    strict: true
};

// Need to change the razorpay api key to the live mode key.
// Also for clerk