import { useAuthDispatch, useAuthState } from "@/shared/state/context";
import React, { useState } from "react";
import { updateUser } from "./api";
import { Input } from "@/shared/components/Input";
import { Alert } from "@/shared/components/Alert";
import { Button } from "@/shared/components/Button";

export default function UserEditForm({ setEditMode, setTempImage }) {
  const authState = useAuthState();
  const [newUserName, setNewUserName] = useState(authState.username);
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();
  const dispatch = useAuthDispatch();
  const [newImage, setNewImage] = useState();

  const onChangeUserName = (event) => {
    setNewUserName(event.target.value);
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        username: undefined,
      };
    });
  };

  const onClickCancel = () => {
    setEditMode(false);
    setNewUserName(authState.username);
    setNewImage();
    setTempImage();
  };

  const onSelectImage = (event) => {
    setErrors(function (lastErrors) {
      return {
        ...lastErrors,
        image: undefined,
      };
    });

    if (event.target.files.length < 1) {
      return;
    }

    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const data = fileReader.result;
      setNewImage(data);
      setTempImage(data);
    };

    fileReader.readAsDataURL(file);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setApiProgress(true);
    setErrors({});
    setGeneralError();
    try {
      const { data } = await updateUser(authState.id, {
        username: newUserName,
        image: newImage,
      });
      dispatch({
        type: "user-update-success",
        data: { username: data.username, image: data.image },
      });
      setEditMode(false);
    } catch (axiosError) {
      if (axiosError.response?.data) {
        if (axiosError.response.data.status === 400) {
          setErrors(axiosError.response.data.validationErrors);
        } else {
          setGeneralError(axiosError.response.data.message);
        }
      } else {
        setGeneralError("Unexpected error occured. Please try again.");
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="ms-3 container pb-3 pe-5">
        <Input
          label="Username"
          defaultValue={authState.username}
          onChange={onChangeUserName}
          error={errors.username}
        />
        <Input
          label="Profile Image"
          type="file"
          onChange={onSelectImage}
          error={errors.image}
        />
        {generalError && <Alert styleType="danger">{generalError}</Alert>}
        <Button
          styleType="outline-secondary me-3"
          onClick={onClickCancel}
          type="button"
        >
          Cancel
        </Button>
        <Button apiProgress={apiProgress} type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
