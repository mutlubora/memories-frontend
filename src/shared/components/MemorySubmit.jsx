import React, { useState } from "react";
import { Button } from "./Button";
import { postMemory, postMemoryAttachment } from "@/pages/Home/api";
import { Alert } from "./Alert";
import { useAuthState } from "../state/context";
import ProfileImage from "./ProfileImage";
import { Input } from "./Input";
import AutoUploadImage from "./AutoUploadImage";

const MemorySubmit = () => {
  const [memory, setMemory] = useState();
  const [apiProgress, setApiProgress] = useState(false);
  const [error, setError] = useState(false);
  const authState = useAuthState();
  const [newImage, setNewImage] = useState();
  const [isFocused, setIsFocused] = useState(false);
  const [attachmentId, setAttachmentId] = useState();
  const onChangeFile = (event) => {
    if (event.target.files.length < 1) {
      return;
    }

    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
      uploadFile(file);
    };
    fileReader.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    setApiProgress(true);
    const attachment = new FormData();
    attachment.append("file", file);
    try {
      const response = await postMemoryAttachment(attachment);
      setAttachmentId(response.data.id);
    } catch (error) {
    } finally {
      setApiProgress(false);
    }
  };

  const onClickSubmit = async () => {
    setApiProgress(true);
    try {
      const response = await postMemory({
        content: memory,
        attachmentId: attachmentId,
      });
    } catch (error) {
      setError(true);
    } finally {
      setApiProgress(false);
      setIsFocused(false);
      setMemory("");
      setNewImage();
      setAttachmentId();
    }
  };

  return (
    <div className="card p-1 col-8 flex-row">
      <ProfileImage width={60} image={authState.image} />
      <div className="flex-fill m-2">
        <textarea
          className="form-control me-2"
          placeholder="What's happening?"
          onChange={(event) => {
            setError(false);
            setMemory(event.target.value);
          }}
          disabled={apiProgress}
          value={memory}
          maxLength={280}
          onFocus={() => setIsFocused(true)}
        ></textarea>
        {isFocused && (
          <>
            {" "}
            <Input type="file" onChange={onChangeFile} />
            {newImage && (
              <AutoUploadImage image={newImage} uploading={apiProgress} />
            )}
            <div className="text-right mt-1">
              <Button
                disabled={!memory && !newImage}
                onClick={onClickSubmit}
                apiProgress={apiProgress}
              >
                Submit
              </Button>
            </div>{" "}
          </>
        )}
        {error && <Alert styleType="danger">Memory failed to send</Alert>}
      </div>
    </div>
  );
};

export default MemorySubmit;
