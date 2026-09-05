import  config from "../confing/confing"; 

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

           this.databases = new Databases(this.client);
           this.bucket = new Storage(this.client);  
    }

    async createPost( {title, content,slug,featuredImage,status,userId} ) {

        try {
             return await this.databases.createDocument(
                config.appwriterDatabaseID,
                config.appwriterTableID,
                slug,
                {
                    title,
                    content,
                    userId,
                    featuredImage,
                    status
                }
             )

        }
        catch(error){
            throw error ;
        }
}

async updatePost( slug,{title, content,featuredImage,status} ) {
     try {
         
         return await this.databases.updateDocument(
            config.appwriterDatabaseID,
            config.appwriterTableID,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
         )
        
     } catch (error) {
        throw error ;
     }

}
   
async deletePost(slug){

    try {
        await this.databases.deleteDocument(
            config.appwriterDatabaseID,
            config.appwriterTableID,
            slug
        )
        return true ;
    }
        catch(error){
            throw error ;
            return false  ;
        }
    }

    async getPost(slug){
        try{
            await this.databases.getDocument(
                config.appwriterDatabaseID,
                config.appwriterTableID,
                slug
            )
        }
        catch (error){
            throw error ;
        }
    }


    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                config.appwriterDatabaseID,
                config.appwriterTableID,
                queries
            )
        }
        catch (error){
            throw error ;
            return false ;
        }
    }


    // file upload method 
     async uploadFile(file){

        try{

            return await this.bucket.createFile(
                config.appwriterBucketID,
                ID.unique(),
                file
            )
        }
        catch(error){

        }
     }


     //file delete method 

     async deleteFile(fileId){
        try{
             await this.bucket.deleteFile(
                config.appweiterBucketID,
                fileId
            )
            return true ;

        }
        catch (error){
            throw error ;
            return false ;
        }
     }

     getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appweiterBucketID,
            fileId
        )
     }



}

const service = new Service();

export default service;