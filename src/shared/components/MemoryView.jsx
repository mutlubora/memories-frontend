import React, { useState } from "react";
import ProfileImage from "./ProfileImage";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useAuthState } from "../state/context";
import { deleteMemory } from "@/pages/Home/api";
import Modal from "./Modal";
export default function MemoryView({ memory, onDeleteSuccess }) {
  const { user, content, timestamp, fileAttachment } = memory;
  const { id, username, image } = user;
  const formattedTime = format(timestamp);
  const loggedUser = useAuthState();
  const ownedByLoggedUser = loggedUser.username == username;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [apiProgress, setApiProgress] = useState(false);
  const onClickDelete = async () => {
    setApiProgress(true);
    try {
      await deleteMemory(memory.id);
      onDeleteSuccess(memory.id);
    } catch (error) {
    } finally {
      setApiProgress(false);
    }
  };

  const onClickCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      {" "}
      <div className="card p-3">
        <div className="d-flex">
          <ProfileImage image={image} width={40} className="m-1"></ProfileImage>
          <div className="flex-fill ms-2 mt-1">
            <strong>
              <Link to={`/user/${id}`} style={{ textDecoration: "none" }}>
                {username}
              </Link>
            </strong>
            <small className="ms-1">{formattedTime}</small>
          </div>
          {ownedByLoggedUser && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer", color: "gray" }}
              onClick={() => setIsModalVisible(true)}
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          )}
        </div>
        <div className="ps-5 mb-1">{content}</div>
        {fileAttachment && (
          <div className="ps-5 mt-1">
            <img
              className="rounded"
              width={350}
              height={450}
              src={"/memory/" + fileAttachment.name}
              alt={content}
            />
          </div>
        )}
      </div>
      <Modal
        isModalVisible={isModalVisible}
        onClickCancel={onClickCancel}
        onClickOk={onClickDelete}
        apiProgress={apiProgress}
        message={"memory"}
      />
    </>
  );
}
