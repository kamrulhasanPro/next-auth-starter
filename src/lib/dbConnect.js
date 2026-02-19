import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"])

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const db = process.env.DB_NAME;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = async(cname) => {
  return client.db(db).collection(cname);
};
