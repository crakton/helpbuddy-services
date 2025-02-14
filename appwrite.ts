import { Client, Account, Databases, Storage, ID, Permission, Role } from 'appwrite';


const getEnv = (key: string): string => {
  const value = process.env[key] || process.env[`NEXT_PUBLIC_${key}`];

  if (!value) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
    console.log("Available environment variables:","All here ", JSON.stringify(process.env, null, 2));
    return ""; 
  }

  return value;
};
console.log("Loaded Environment Variables:", JSON.stringify(process.env, null, 2));

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("678e8b3f003e4494c068"); 

const storage = new Storage(client);


export const account = new Account(client);
export const databases = new Databases(client);
export { storage, ID, Permission, Role }; 
export default client;
