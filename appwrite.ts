import { Client, Account, Databases, Storage, ID, Permission, Role } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('679a0ccf003d8130276a'); // Replace with your project ID

const storage = new Storage(client);


// Exporting instances for use in other parts of the project
export const account = new Account(client);
export const databases = new Databases(client);
export { storage, ID, Permission, Role }; // Export Permission & Role for use
export default client;
