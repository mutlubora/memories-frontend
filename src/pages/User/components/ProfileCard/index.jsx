import React, { useState } from "react";
import { useAuthDispatch, useAuthState } from "@/shared/state/context";
import { Button } from "@/shared/components/Button";
import ProfileImage from "@/shared/components/ProfileImage";
import UserEditForm from "./UserEditForm";
import MemoryFeed from "@/shared/components/MemoryFeed";
import Modal from "@/shared/components/Modal";
import { deleteAccount } from "./api";
import { Link } from "react-router-dom";

export default function ProfileCard({ user }) {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false);
  const [tempImage, setTempImage] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isEditButtonVisible = !editMode && authState.id === user.id;
  const [apiProgress, setApiProgress] = useState(false);
  const dispatch = useAuthDispatch();

  const visibleUsername =
    authState.id === user.id ? authState.username : user.username;

  const onClickDeleteAccount = async () => {
    setApiProgress(true);
    try {
      await deleteAccount(authState.id);
      setApiProgress(false);
      setIsModalVisible(false);
      dispatch({
        type: "logout-success",
      });
      location.href = "/";
    } catch (error) {}
  };

  const onClickCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="card">
        <div className="card-header text-center">
          <ProfileImage width={180} tempImage={tempImage} image={user.image} />
        </div>
        <div className="card-body text-center">
          {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
          {isEditButtonVisible && (
            <>
              <Button
                styleType="link"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Edit
              </Button>
              <Button
                styleType="link link-danger"
                onClick={() => setIsModalVisible(true)}
              >
                Delete Account
              </Button>
            </>
          )}
        </div>
        {editMode && (
          <UserEditForm setEditMode={setEditMode} setTempImage={setTempImage} />
        )}
      </div>
      <div className="row d-flex justify-content-center">
        <MemoryFeed userId={user.id}></MemoryFeed>
      </div>
      <Modal
        isModalVisible={isModalVisible}
        onClickCancel={onClickCancel}
        onClickOk={onClickDeleteAccount}
        apiProgress={apiProgress}
        message={"account"}
      />
    </>
  );
}
