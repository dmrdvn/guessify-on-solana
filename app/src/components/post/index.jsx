import React, { useState, useEffect } from "react";

import Photo from "./photo";
import Content from "./content";
import ParticipatePost from "../participatepost";
import Toolbar from "./toolbar";
import PostModal from "../modal";
import lv6 from "../../assets/nfts/lv6predictor.png";

export default function Post({ postData }) {
  const [post, setPost] = useState(postData);
  const [author, setAuthor] = useState("");
  //const [postsCount, setPostsCount] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  console.log(post.account.content);
  return (
    <div className="relative  bg-[#212f48] rounded-[0.375rem]  flex flex-col justify-start items-start mb-10 ">
      <div className="absolute top-0 left-0 px-1 bg-[#eef3f41a] rounded-[0.375rem] m-2">
        <span className="text-[.80rem] opacity-50">#1</span>
      </div>

      <div
        id="post-inner"
        className=" flex justify-center items-start px-5 py-10"
      >
        {/* Photo Area */}
        <Photo img={lv6} name={author.fullName} />

        {/* Description Area */}
        <Content post={post} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Interact Area */}
      <Toolbar post={post} />

      <PostModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <ParticipatePost postData={post} />
      </PostModal>
    </div>
  );
}
