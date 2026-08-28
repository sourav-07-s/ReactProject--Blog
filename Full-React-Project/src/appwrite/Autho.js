import config from "../confing/confing";
import {Client , ID, Account} from "appwrite"




export class AuthService{

    client = new Client();
    account ;

    constructor(){
        this.client 
              .setEndpoint(config.appwriteUrl)
              .setProject(config.appwriterProjectID)

        this.account = new Account(this.client) ;     

        this.account
             
    }

    //create Account

   async createAccount({email,password,name}){

    try {
        const userAccount = await this.account.create(ID.unique(),email,password,name)

        if(userAccount){
            return this.login({email,password})

        }

        else {
            return userAccount ;
        }
        
    } catch (error) {
        throw error ;
        
    }
   }

   //login

   async login ({email,password}){

    try {
        const login = await this.account.createEmailPasswordSession(email,password)

        return login ;
        
    } catch (error) {
        throw error ;
        
    }

   }

   // get current user 
   async getCurrentUser() {
    try {
        return await this.account.get();

    } catch (error) {
        throw error ;
    }
    return null ;
   }

   //Logout
   async logout(){
    try {
        this.account.deleteSessions();
        
    } catch (error) {
        throw error ;
        
    }
   }
}

const authoService = new AuthService() ;


export default authoService ;