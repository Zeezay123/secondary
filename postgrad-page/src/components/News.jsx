import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const News = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();

        if (res.ok && data.posts) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Section Header */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
          News
        </h2>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Stay in the know with insights from industry experts.
        </p>
      </div>

      {/* News Grid */}
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {posts.map((post, index) => (
    <Link
      key={post._id}
      to={`/post/${post.slug}`}
      className={`group flex flex-col focus:outline-hidden ${
        index === 2
          ? "relative w-full min-h-[400px] bg-center bg-cover rounded-xl hover:shadow-lg transition"
          : ""
      }`}
      style={
        index === 2
          ? { backgroundImage: `url(${post.image})` }
          : undefined
      }
    >
      {index !== 2 ? (
        <>
          <div className="relative pt-[80%] sm:pt-[85%] rounded-xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
            />
          </div>
          <div className="mt-7 p-6">
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
              {post.title}
            </h3>
            <p className="mt-3 text-gray-800 dark:text-neutral-200 line-clamp-3">
              {post.content.replace(/<[^>]+>/g, "")}
            </p>
            <p className="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline font-medium dark:text-blue-500">
              Read more
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex-auto p-6 md:p-8">
            <h3 className="text-2xl text-white/90 group-hover:text-white">
              <span className="font-bold">{post.title}</span>
            </h3>
          </div>
          <div className="pt-0 p-6 md:p-8">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70">
              Read more
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </>
      )}
    </Link>
  ))}
</div>
       
    </div>
  );
};

export default News;
