import { useState } from 'react';

// Define the types for the props
interface FileUploadDivProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle file change
  isUploading: boolean; // Boolean to control the uploading state
}

const FileUploadDiv = ({ onChange, isUploading }: FileUploadDivProps) => {
  const [fileInput, setFileInput] = useState<HTMLInputElement | null>(null);

  const handleClick = () => {
    // Trigger the hidden file input click
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event); // Pass the file change event to the parent handler
    }
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={(input) => setFileInput(input)} // Set the file input reference
        onChange={handleFileChange}
      />

      {/* Clickable div to trigger file input */}
      <div
        onClick={handleClick}
        className="py-2 max-w-[10rem] w-full text-white bg-gradient-to-b from-blue-400 to-blue-900 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-800 transition duration-500 rounded cursor-pointer"
      >
        <span className="capitalize font-semibold text-xs sm:text-sm lg:text-base">Upload</span>
        <span className="lowercase font-semibold px-1 text-xs sm:text-sm lg:text-base"> a </span>
        <span className="capitalize font-semibold text-xs sm:text-sm lg:text-base"> Photo </span>

        {isUploading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
            <span className="text-white">Uploading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadDiv;
