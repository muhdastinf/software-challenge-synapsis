"use client"

import React, { useEffect, useState } from "react";
import TopNavigation from "@/components/topNavigation/topNavigation";
import axios from "axios";
import Image from "next/image";

export default function DetailPage({ params }: { params: { id: number } }) {
  const detailId = params.id;
  const [detailPosts, setDetailPosts] = useState<IPosts[]>([]);
  const [detailComments, setDetailComments] = useState<IComments[]>([]);

  const getDetailPosts = async () => {
    try {
      const responsePosts = await axios.get(
        `https://gorest.co.in/public/v2/posts/${detailId}`
      );
      setDetailPosts([responsePosts.data]);
    } catch (e) {
      console.error("Error fetching data posts: ", e);
    }
  };

  const getDetailComments = async () => {
    try {
      const responseComments = await axios.get(
        `https://gorest.co.in/public/v2/posts/${detailId}/comments`
      );
      setDetailComments(responseComments.data);
    } catch (e) {
      console.error("Error fetching data comments: ", e);
    }
  };

  useEffect(() => {
    getDetailPosts();
    getDetailComments();
  }, []);

  return (
    <>
      <TopNavigation />

      {detailPosts.map((post, i) => (
        <div className="pb-8" key={i}>
          <div className="mt-20 mb-10 text-center font-bold text-3xl p-24 uppercase" style={{backgroundImage: 'linear-gradient(to right, #00c3ff, #ffff1c)'}}>
            {post.title}
          </div>
          <div className="detail mx-20 mb-12 text-justify text-lg">
            {post.body}
          </div>
          <div className="font-bold text-lg mx-20">COMMENTS</div>
          <hr className="h-px bg-gray-500 border-0 mx-20 mb-6 w-2/3"></hr>
          {detailComments.length === 0 ? (
            <div className="mx-20 mb-4 font-semibold text-gray-500">NO COMMENTS HERE...</div>
          ) : (
            detailComments.map((comment, j) => (
              <div
                className="mx-20 mb-4 bg-gray-200 rounded-lg px-6 py-4 shadow-lg w-2/3"
                key={j}
              >
                <div className="flex gap-4  items-center">
                  <Image
                    className="rounded-full"
                    src="/img_avatar.png"
                    height={50}
                    width={50}
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <div className="font-bold">{comment.name}</div>
                      <div>-</div>
                      <div>{comment.email}</div>
                    </div>
                    <div>{comment.body}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ))}
    </>
  );
}
