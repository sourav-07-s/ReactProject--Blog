import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useSelector } from "react-redux";

import parse from "html-react-parser";

import service from "../appwrite/conf";

import {
  Button,
  Container,
} from "../components";

const Post = () => {
  const [post, setPost] =
    useState(null);

  const { slug } = useParams();

  const navigate = useNavigate();

  const userData = useSelector(
    (state) => state.auth.userData
  );

  const isAuthor =
    post &&
    userData &&
    post.userId === userData.$id;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    service
      .getPost(slug)
      .then((response) => {
        if (response) {
          setPost(response);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(
          "Failed to load post:",
          error
        );
        navigate("/");
      });
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) {
      return;
    }

    try {
      const status =
        await service.deletePost(
          post.$id
        );

      if (status) {
        if (post.featuredImage) {
          await service.deleteFile(
            post.featuredImage
          );
        }

        navigate("/");
      }
    } catch (error) {
      console.error(
        "Failed to delete post:",
        error
      );
    }
  };

  if (!post) {
    return (
      <div className="py-8 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <div className="w-full mb-6">
          {post.featuredImage && (
            <img
              src={service.getFilePreview(
                post.featuredImage
              )}
              alt={post.title}
              className="w-full max-h-125 object-cover rounded-xl"
            />
          )}
        </div>

        {isAuthor && (
          <div className="mb-6">
            <Link
              to={`/edit-post/${post.$id}`}
            >
              <Button
                bgColor="bg-green-500"
                className="mr-3"
              >
                Edit
              </Button>
            </Link>

            <Button
              bgColor="bg-red-500"
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-6 text-white">
          {post.title}
        </h1>

        <div className="browser-css bg-white rounded-xl p-6">
          {parse(post.content || "")}
        </div>
      </Container>
    </div>
  );
};

export default Post;