import React, { useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, push, set } from "firebase/database";
import { storage, database } from "../firebase/firebase";

import Loading from "./Loading";

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
    // Remove any non-digit characters
    const rawValue = e.target.value.replace(/\D/g, "");

    // Check if the input is empty or negative
    if (!rawValue) {
      setInputValue("");
      return;
    }

    // Format the value into IDR currency format
    const formattedValue = formatIDRCurrency(rawValue);

    // Update the state with the formatted value
    setPrice(formattedValue);
  };

  const formatIDRCurrency = (value) => {
    // Convert the value to a string
    let stringValue = value.toString();

    // Add dots every 3 digits from the right
    stringValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Add 'Rp.' prefix
    return stringValue;
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
        {loading ? (
          <Loading />
        ) : (
          <button type="submit" disabled={loading}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default UploadForm;
