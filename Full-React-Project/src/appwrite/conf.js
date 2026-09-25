import config from "../confing/confing";

import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create post
  async createPost({
    title,
    content,
    slug,
    featuredImage,
    status,
    userId,
  }) {
    return await this.databases.createDocument({
      databaseId: config.appwriteDatabaseId,
      collectionId: config.appwriteCollectionId,
      documentId: slug,
      data: {
        title,
        content,
        userId,
        featuredImage,
        status,
      },
    });
  }

  // Update post
  async updatePost(
    documentId,
    { title, content, featuredImage, status }
  ) {
    return await this.databases.updateDocument({
      databaseId: config.appwriteDatabaseId,
      collectionId: config.appwriteCollectionId,
      documentId,
      data: {
        title,
        content,
        featuredImage,
        status,
      },
    });
  }

  // Delete post
  async deletePost(documentId) {
    await this.databases.deleteDocument({
      databaseId: config.appwriteDatabaseId,
      collectionId: config.appwriteCollectionId,
      documentId,
    });

    return true;
  }

  // Get one post
  async getPost(documentId) {
    return await this.databases.getDocument({
      databaseId: config.appwriteDatabaseId,
      collectionId: config.appwriteCollectionId,
      documentId,
    });
  }

  // Get posts
  async getPosts(
    queries = [Query.equal("status", "active")]
  ) {
    return await this.databases.listDocuments({
      databaseId: config.appwriteDatabaseId,
      collectionId: config.appwriteCollectionId,
      queries,
    });
  }

  // Upload file
  async uploadFile(file, userId) {
  if (!file) {
    return null;
  }

  return await this.bucket.createFile({
    bucketId: config.appwriteBucketId,
    fileId: ID.unique(),
    file,

    permissions: [
      Permission.read(Role.any()),
      Permission.update(Role.user(userId)),
      Permission.delete(Role.user(userId)),
    ],
  });
}

  // Delete file
  async deleteFile(fileId) {
    if (!fileId) {
      return false;
    }

    await this.bucket.deleteFile({
      bucketId: config.appwriteBucketId,
      fileId,
    });

    return true;
  }

  // Get file preview URL
  getFilePreview(fileId) {
    if (!fileId) {
      return null;
    }

    return this.bucket.getFilePreview({
      bucketId: config.appwriteBucketId,
      fileId,
    });
  }
}

const service = new Service();

export default service;