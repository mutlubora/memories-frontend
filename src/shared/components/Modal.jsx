import React from "react";
import { Button } from "./Button";

export default function Modal({
  isModalVisible,
  onClickCancel,
  onClickOk,
  apiProgress,
  message,
}) {
  let className = "modal fade";
  if (isModalVisible) {
    className += "show d-block";
  }
  return (
    <div className={className} style={{ backgroundColor: "#000000b0" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete {message}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClickCancel}
            ></button>
          </div>
          <div className="modal-body">
            <strong> Are you sure you want to delete this {message}?</strong>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClickCancel}
            >
              Cancel
            </button>
            <Button
              type="button"
              styleType="danger"
              onClick={onClickOk}
              apiProgress={apiProgress}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
