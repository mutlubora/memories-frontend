import React from "react";
import defaultProfileImg from "@/assets/profile-default.jpg";

export default function ProfileImage({ width, tempImage, image }) {
  const profileImage = image ? `/profile/${image}` : defaultProfileImg;

  return (
    <div>
      <img
        src={tempImage || profileImage}
        alt="Profile"
        width={width}
        height={width}
        className="rounded-circle shadow-sm"
        onError={({ target }) => {
          target.src = defaultProfileImg;
        }}
      />
    </div>
  );
}
