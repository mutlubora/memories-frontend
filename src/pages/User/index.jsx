import { Alert } from "@/shared/components/Alert";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "./api";
import ProfileCard from "./components/ProfileCard";

export default function User() {
  const { id } = useParams();
  const [apiProgress, setApiProgress] = useState();
  const [user, setUser] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function loadUser() {
      setErrorMessage(false);
      setApiProgress(true);
      try {
        const response = await getUser(id);
        setUser(response.data);
      } catch (axiosError) {
        setErrorMessage(axiosError.response.data.message);
      } finally {
        setApiProgress(false);
      }
    }
    loadUser();
  }, [id]);

  return (
    <>
      {apiProgress && (
        <span className="spinner-border" aria-hidden="true"></span>
      )}

      {user && <ProfileCard user={user}></ProfileCard>}

      {errorMessage && <Alert styleType="danger">{errorMessage}</Alert>}
    </>
  );
}
