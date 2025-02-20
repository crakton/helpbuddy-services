import { Client, Account, Databases, Storage, ID, Permission, Role,} from 'appwrite';


const endpoint = process.env.APPWRITE_ENDPOINT
 const projectId =   process.env.APPWRITE_PROJECT_ID


const client = new Client();
client
  .setEndpoint(endpoint as string) 
  .setProject(projectId as string) ; 

const storage = new Storage(client);

export const account = new Account(client);
export const databases = new Databases(client);
export { storage, ID, Permission, Role }; 
export default client;

