import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/button";
import { AiFillHome } from "react-icons/ai";
import { GiMagicHat } from "react-icons/gi";
import { MdLocalActivity } from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaPeopleGroup } from "react-icons/fa6";
import Modal from "react-modal";
import CreatePost from "../createpost";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#192435",
    width: "700px",
    padding: "40px",
    borderRadius: ".5rem",
    backgroundColor: "#192435",
  },
};
Modal.setAppElement("#root");

export default function LeftMenu() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // Modal açıldığında yapılacak işlemler
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <nav className="w-full space-y-2 p-4 flex flex-col">
      <NavLink to="/" className="relative block group">
        <div className="inline-flex items-center  text-white transition-colors py-2 font-medium text-sm  w-full rounded-[0.375rem] group-hover:bg-[#eef3f41a] bg-[#eef3f41a] px-1">
          <span className="flex flex-shrink-0 w-6 items-center justify-center">
            <AiFillHome />
          </span>
          <span className="text-[1rem] ml-3 truncate font-normal">Home</span>
        </div>
      </NavLink>

      <NavLink to="/explore" className="relative block group">
        <div className="inline-flex items-center  text-white transition-colors py-2 font-medium text-sm  w-full rounded-[0.375rem] group-hover:bg-[#eef3f41a]  px-1">
          <span className="flex flex-shrink-0 w-6 items-center justify-center">
            <svg
              stroke="white"
              fill="white"
              strokeWidth="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"></path>
            </svg>
          </span>
          <span className="text-[1rem] ml-3 truncate font-normal">Explore</span>
        </div>
      </NavLink>

      <NavLink to="/g-bots" className="relative block group">
        <div className="inline-flex items-center  text-white transition-colors py-2 font-medium text-sm  w-full rounded-[0.375rem] group-hover:bg-[#eef3f41a]  px-1">
          <span className="flex flex-shrink-0 w-6 items-center justify-center">
            <GiMagicHat />
          </span>
          <span className="text-[1rem] ml-3 truncate font-normal">G-Bots</span>
        </div>
      </NavLink>

      <div className="h-[1px] bg-[#eef3f41a] bg-opacity-10 block" />
      <NavLink to="/events" className="relative block group">
        <div className="inline-flex items-center  text-white transition-colors py-2 font-medium text-sm  w-full rounded-[0.375rem] group-hover:bg-[#eef3f41a]  px-1">
          <span className="flex flex-shrink-0 w-6 items-center justify-center">
            <MdLocalActivity />
          </span>
          <span className="text-[.875rem] ml-3 truncate font-normal">
            Events
          </span>
        </div>
      </NavLink>
      <NavLink to="/proposals" className="relative block group">
        <div className="inline-flex items-center  text-white transition-colors py-2 font-medium text-sm  w-full rounded-[0.375rem] group-hover:bg-[#eef3f41a]  px-1">
          <span className="flex flex-shrink-0 w-6 items-center justify-center">
            <FaPeopleGroup />
          </span>
          <span className="text-[1rem] ml-3 truncate font-normal">
            Proposals
          </span>
        </div>
      </NavLink>

      <NavLink to="/profile" className="relative block group">
        <div className="inline-flex items-center  text-white transition-colors py-2 font-medium text-sm  w-full rounded-[0.375rem] group-hover:bg-[#eef3f41a]  px-1">
          <span className="flex flex-shrink-0 w-6 items-center justify-center">
            <BsFillPersonLinesFill />
          </span>
          <span className="text-[1rem] ml-3 truncate font-normal">
            My Profile
          </span>
        </div>
      </NavLink>

      <div className="h-[1px] bg-[#eef3f41a] bg-opacity-10 block" />

      <Button onClick={openModal}>Create Prediction</Button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel="Example Modal"
      >
        <button
          onClick={closeModal}
          className="absolute right-0 top-0 bg-[red] p-1 px-3 rounded-bl-[0.375rem]"
        >
          X
        </button>
        <CreatePost modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </Modal>
    </nav>
  );
}
