import StickyHeader from "../../components/stickheader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Tab from "./../../components/tab";
import Overview from "./overview";
import MyPredictions from "./mypredictions";
import Bagdes from "./badges";
import Followers from "./followers";
import Statics from "./statics";
import { unixFormat } from "../../utils/format";

function Profile() {
  const [user, setUser] = useState("");
  const [post, setPost] = useState([]);
  const [postCount, setPostCount] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  return <div className="">Updating</div>;
}

export default Profile;
