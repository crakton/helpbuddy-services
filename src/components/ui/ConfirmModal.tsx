"use client";

import { useState } from "react";

const ConfirmModal = ({
  title,
  message,
  onConfirm,
  onCancel,
  isOpen,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {


  return (
    <>
      {isOpen && (
        <div className="modal">
          <h2>{title}</h2>
          <p>{message}</p>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;
