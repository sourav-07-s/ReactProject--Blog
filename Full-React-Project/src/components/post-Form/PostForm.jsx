import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import service from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({ post }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();

  const userdata = useSelector(
    (state) => state.auth.userData
  );

  const submit = async (data) => {
    try {
    
      // UPDATE
      
      if (post) {
        let file = null;

        if (data.image?.[0]) {
          file = await service.uploadFile(
            data.image[0]
          );
        }

        if (file && post.featuredImage) {
          await service.deleteFile(
            post.featuredImage
          );
        }

        // CHANGE: remove image before sending to DB
        const { image, ...postData } = data;

        const dbpost = await service.updatePost(
          post.$id,
          {
            ...postData,
            featuredImage: file
              ? file.$id
              : post.featuredImage,
          }
        );

        if (dbpost) {
          navigate(`/post/${dbpost.$id}`);
        }

        return;
      }

     
      // CREATE
      
      if (!userdata) {
        console.error("User is not logged in");
        return;
      }

      if (!data.image?.[0]) {
        console.error(
          "Featured image is required"
        );
        return;
      }

   const file = await service.uploadFile(
  data.image[0],
  userdata.$id
);

      if (file) {
        const fileID = file.$id;

        // CHANGE: remove image before sending to DB
        const { image, ...postData } = data;

        const dbpost =
          await service.createPost({
            ...postData,
            featuredImage: fileID,
            userId: userdata.$id,
          });

        if (dbpost) {
          navigate(
            `/post/${dbpost.$id}`
          );
        }
      }
    } catch (error) {
      console.error(
        "Post submission error:",
        error
      );
    }
  };

  const slugTransform = useCallback(
    (value) => {
      if (
        value &&
        typeof value === "string"
      ) {
        return value
          .trim()
          .toLowerCase()
          .replace(
            /[^a-zA-Z0-9\s-]/g,
            ""
          )
          .replace(/\s+/g, "-");
      }

      return "";
    },
    []
  );

  useEffect(() => {
    const subscription = watch(
      (value, { name }) => {
        if (name === "title") {
          setValue(
            "slug",
            slugTransform(value.title),
            {
              shouldValidate: true,
            }
          );
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [
    watch,
    slugTransform,
    setValue,
  ]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap"
    >
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />

        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) => {
            setValue(
              "slug",
              slugTransform(
                e.currentTarget.value
              ),
              {
                shouldValidate: true,
              }
            );
          }}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues(
            "content"
          )}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png,image/jpg,image/jpeg,image/gif"
          {...register("image", {
            required: !post,
          })}
        />

        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(
                post.featuredImage
              )}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={[
            "active",
            "inactive",
          ]}
          label="Status"
          className="mb-4"
          {...register("status", {
            required: true,
          })}
        />

        <Button
          type="submit"
          bgColor={
            post
              ? "bg-green-500"
              : undefined
          }
          className="w-full"
        >
          {post
            ? "Update"
            : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;