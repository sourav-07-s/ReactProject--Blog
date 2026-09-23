import appwriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

const PostCard = ({
  $id,
  title,
  featuredImage,
}) => {
  return (
    <Link
      to={`/post/${$id}`}
      className="block w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition"
    >
      <div className="w-full mb-4">
        {featuredImage && (
          <img
            src={appwriteService.getFilePreview(
              featuredImage
            )}
            alt={title}
            className="w-full rounded-xl"
          />
        )}
      </div>

      <h2 className="text-xl font-bold">
        {title}
      </h2>
    </Link>
  );
};

export default PostCard;