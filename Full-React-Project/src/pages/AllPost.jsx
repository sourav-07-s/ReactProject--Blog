import { useEffect, useState } from "react";

import {
  Container,
  PostCard,
} from "../components";

import service from "../appwrite/conf";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    service
      .getPosts()
      .then((response) => {
        setPosts(response?.documents || []);
      })
      .catch((error) => {
        console.error(
          "Failed to load posts:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="w-full md:w-1/2 lg:w-1/4 p-2"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;