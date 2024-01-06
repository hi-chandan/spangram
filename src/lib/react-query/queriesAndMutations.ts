import { useQuery,
useMutation,
useQueryClient,
useInfiniteQuery,
} from "@tanstack/react-query";
import { CreateUserAccount,SignInAccount } from "../appwrite/api";
import { INewUser } from "@/types";


export const useCreateUserAccountMutation = () =>{
  return useMutation({
    mutationFn:(user:INewUser)=> CreateUserAccount(user)
  })
}
export const useSignInAccount = () =>{
  return useMutation({
    mutationFn:(user:{
      email:string,
      password:string,
    })=> SignInAccount(user),
  })
}