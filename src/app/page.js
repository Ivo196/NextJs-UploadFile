"use client";
import { NextResponse } from "next/server";
import { useState } from "react";
import Image from "next/image";

function HomePage() {
  const [file, setFile] = useState();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!file) return

    const form = new FormData();
    form.set("file", file);
    //sending file to server
    const res = await fetch("./api/upload", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div className="flex h-screen justify-center item-center">
      <div className="bg-zinc-950 p-5 rounded-md">
        <h1 className="text-4xl text-center my-4 ">Upload File</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            className="bg-zinc-700  text-zinc-100 p-2 rounded block mb-2 "
            onChange={handleFileChange}
          />
          <button
            className="bg-green-900  text-zinc-100 p-2 rounded block w-full disabled:opacity-50"
            disabled={!file}
          >
            Upload!
          </button>
        </form>
        {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="uploaded file"
            className="w-64 h-64 object-cover mx-auto my-4"
            width={400}
            height={400}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
