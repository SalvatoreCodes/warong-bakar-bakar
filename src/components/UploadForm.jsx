// src/UploadForm.js
import React, { useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, push, set } from "firebase/database";
import { storage, database } from "../firebase";

function UploadForm() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !name || !price) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    try {
      const storageReference = storageRef(storage, `images/${file.name}`);
      await uploadBytes(storageReference, file);
      const imageUrl = await getDownloadURL(storageReference);

      const newDataRef = push(dbRef(database, "items"));
      await set(newDataRef, {
        id: newDataRef.key,
        imageUrl,
        name,
        price,
      });

      alert("Data saved successfully.");
    } catch (error) {
      console.error("Error uploading file or saving data: ", error);
      alert("Error uploading file or saving data.");
    } finally {
      setLoading(false);
      setFile(null);
      setFileUrl(null);
      setName("");
      setPrice("");
    }
  };

  return (
    <div className="upload--form">
      <h1>Upload Image and Save Data</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        {fileUrl && (
          <img
            src={fileUrl}
            alt="Selected"
            style={{ width: "200px", height: "200px", margin: "10px" }}
          />
        )}
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter name"
          required
        />
        <input
          type="text"
          value={price}
          onChange={handlePriceChange}
          placeholder="Enter price"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
