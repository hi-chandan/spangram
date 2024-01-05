import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account } from "./config";

export async function CreateUserAccount(user:INewUser){
try {
  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    user.name
  )

  return newAccount;
} catch (error) {
  console.log(error)
  return error;

}
}



// import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('6591a63352be14cfc595');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });
