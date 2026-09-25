import config from "../confing/confing";
import {Client , ID, Databases, Storage, Query } from "appwrite"



export class Services {
    client = new Client()
    databases ;
    bucket;

    constructor (){
         this.client 
              .setEndpoint(config.appwriteUrl)
              .setProject(config.appwriteProjectId)

         this.databases = new Databases(this.client);
         this.bucket = new Storage(this.client)
    }


    // create
    async CreatePost (title,slug,content,featuredImages ,status,userId ){

        try {

            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
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
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
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
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )

            return true 
            
        } catch (error) {
            throw error ;
            return false ;
            
        }

    }

    // getPost

    async getPost(slug){

        try {
             return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        } catch (error) {
            throw error ;
            return false ;
            
        }

    }

    //get posts

    async getPosts(Queries =[Query.equal("status","active")]){

        try {
          return  await this.databases.listDocuments(
              config.appwriteDatabaseId,
                config.appwriteCollectionId,
                Queries,
           )

            
        } catch (error) {
            throw error ;
            return false ;
        }
    }




    // flile upload
 async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.appwriteBucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        throw error ;
        return false ;
    }
 }


 // file delete

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            config.appwriteBucketId,
            ID.unique(),
            fileId
        )
        return true ;
    } catch (error) {
        throw error ;
        return false ;
    }
 }


 // file preview
 getFilepreview(fileId){
    this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
    )

 }
}

const services = new Services() ;

export default services ;

