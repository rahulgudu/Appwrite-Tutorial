import { Client, Databases } from "appwrite";
export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6795bed2002b82ccb96d");

export const databases = new Databases(client);
