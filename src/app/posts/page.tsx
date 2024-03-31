"use client";

import React, { useEffect, useState } from "react";
import TopNavigation from "@/components/topNavigation/topNavigation";
import BlogCard from "@/components/postCard/blogCard";
import axios from "axios";
import { Spin } from "antd";

export default function PostPage() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [loading, setLoading] = useState(false);
  const getPosts = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await axios.get(
        "https://gorest.co.in/public/v2/posts?page=1&per_page=100"
      );
      setPosts(response.data);
    } catch (e) {
      console.error("Error fatching data posts: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  console.log("posts: ", posts);
  return (
    <>
      <div>
        <TopNavigation />
        <h1
          className="mt-20 p-16 text-center font-bold text-3xl text-white"
          style={{
            backgroundImage: "linear-gradient(to right, #f6d365, #fda085)",
          }}
        >
          BLOGS PAGE
        </h1>
        {loading ? (
          <div className="text-center mt-12">
            <Spin size="large" />
          </div>
        ) : (
          <div className="blogCard mx-20 my-8 grid grid-cols-3 gap-6" >
            {posts.map((post, i) => (
              <BlogCard key={i} {...post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
