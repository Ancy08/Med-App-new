// global.d.ts

declare module "*.css"; // existing line, keep it

declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string; // add your Mongo URI here
    // Add other env variables here if needed, e.g.
    // NEXT_PUBLIC_API_URL: string;
  }
}