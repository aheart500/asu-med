import "dotenv/config";
const dev = true;
export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = dev
  ? "mongodb://localhost:27017/asu-med"
  : process.env.MONGODB_URI;
export const SECRET = process.env.SECRET || "SECRET";
