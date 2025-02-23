"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./button";

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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="bg-slate-200 border border-[#2A2A3C] shadow-lg p-6 rounded-xl w-[90%] max-w-md text-center relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              onClick={onCancel}
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-lg font-semibold text-afruna-blue">{title}</h2>
            <p className="text-gray-900 mt-2">{message}</p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-5">
              <Button variant={"primary"}
                className="px-5 py-2 bg-[#ff4757] hover:bg-[#e84153] text-white rounded-lg shadow-md transition"
                onClick={onConfirm}
              >
                Confirm
              </Button>
              <button
                className="px-5 py-2 bg-[#2C2C3C] hover:bg-[#3A3A4C] text-gray-300 rounded-lg shadow-md transition"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
