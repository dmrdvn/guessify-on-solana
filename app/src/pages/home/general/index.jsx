import React, { useState, useEffect, useCallback } from "react";
import { getAllPosts } from "../../../solanaApi";
import { set } from "@project-serum/anchor/dist/cjs/utils/features";
import Web3 from "web3";
import Post from "../../../components/post";
export default function General() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [getAllPosts]);

  return (
    <div className="px-5 py-5">
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <Post postData={post} />
          </li>
        ))}
      </ul>
      {/* {posts.map((post, index) => (
        <div key={index}>{post}</div>
      ))} */}
      {posts.map((post) => {
        console.log("Content", post.account.content);
        console.log(
          "Bet Amount",
          Web3.utils.fromWei(post.account.betAmount, "ether")
        );

        console.log(
          "Due Date",
          new Date(parseInt(post.account.dueDate) * 1000)
        );
      })}
    </div>
  );
}
