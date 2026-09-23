import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Container,
  PostCard,
} from "../components";

import service from "../appwrite/conf";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] =
    useState(false);

  const authStatus = useSelector(
    (state) => state.auth.status
  );

  useEffect(() => {
    if (!authStatus) {
      return;
    }

    setLoading(true);

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
  }, [authStatus]);

  if (!authStatus) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-2xl font-bold">
            Login to read posts
          </h1>

          <Link
            to="/login"
            className="inline-block mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Login
          </Link>
        </Container>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        Loading posts...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-2xl font-bold">
            No posts available
          </h1>
        </Container>
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

export default Home;