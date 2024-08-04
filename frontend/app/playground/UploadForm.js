"use client";

import React from "react";

const UploadForm = () => {
  const uploadImage = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("http://127.0.0.1:5000/analyze_frame", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={uploadImage}>
      <input required name="files" type="file"></input>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UploadForm;
