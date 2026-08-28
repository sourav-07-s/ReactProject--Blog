import config from "../confing/confing";
import {Client , ID, Databases, Storage, Query } from "appwrite"



export class Services {
    client = new Client()
    databases ;
    bucket;

    constructor (){
         this.client 
              .setEndpoint(config.appwriteUrl)
              .setProject(config.appwriterProjectID)

         this.databases = new Databases(this.client);
         this.bucket = new Storage(this.client)
    }


    // create
    async CreatePost (title,slug,content,featuredImages ,status,userId ){

        try {

            return await this.databases.createDocument(
                config.appwriterDatabaseID,
                config.appwriterTableID,
                slug,
                {title,content,featuredImages,status,userId}
            )
            
        } catch (error) {
            throw error ;
            
        }
    }


    // update 
    async updatePost ( slug,{title,content,featuredImages ,status}){

        try {
            return await this.databases.updateDocument(
                config.appwriterDatabaseID,
                config.appwriterTableID,
                slug,
                {
                    title,
                    content,
                    featuredImages,
                    status,
                }
            )
            
        } catch (error) {
            throw error ;
            
        }

    }

    // delete post 
    async deletePost(slug){

        try {

            await this.databases.deleteDocument(
                config.appwriterDatabaseID,
                config.appwriterTableID,
                slug
            )

            return true 
            
        } catch (error) {
            throw error ;
            return false ;
            
        }

    }

}

const services = new Services() ;

export default services ;

