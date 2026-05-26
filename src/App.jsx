import { useEffect, useState } from "react";

const CLOUD_NAME = "dgqwfg5mp";
const UPLOAD_PRESET = "ndzksccj";

export default function CyberSecurityWebsite() {

  // PERSONAL PASSWORD
  const PERSONAL_PASSWORD = "anjan123";

  const [personalAccess, setPersonalAccess] = useState(false);
  const [personalPassword, setPersonalPassword] = useState("");

  // NOTES STORAGE
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const saved = localStorage.getItem("uploadedFiles");
    return saved ? JSON.parse(saved) : [];
  });

  // PERSONAL IMAGE STORAGE
  const [personalImages, setPersonalImages] = useState(() => {
    const saved = localStorage.getItem("personalImages");
    return saved ? JSON.parse(saved) : [];
  });

  // SAVE NOTES
  useEffect(() => {
    localStorage.setItem(
      "uploadedFiles",
      JSON.stringify(uploadedFiles)
    );
  }, [uploadedFiles]);

  // SAVE PERSONAL IMAGES
  useEffect(() => {
    localStorage.setItem(
      "personalImages",
      JSON.stringify(personalImages)
    );
  }, [personalImages]);

  // NOTES UPLOAD
  const handleUpload = async (e) => {

    const files = Array.from(e.target.files);

    for (const file of files) {

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

      try {

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {

          setUploadedFiles((prev) => [
            ...prev,
            {
              name: file.name,
              url: data.secure_url,
            },
          ]);

          alert("File Uploaded Successfully");

        }

      } catch (error) {

        console.log(error);
        alert("Upload Failed");

      }
    }
  };

  // PERSONAL IMAGE UPLOAD
  const handlePersonalImageUpload = async (e) => {

    const files = Array.from(e.target.files);

    for (const file of files) {

      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      try {

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.secure_url) {

          setPersonalImages((prev) => [
            ...prev,
            data.secure_url,
          ]);

          alert("Image Uploaded");

        }

      } catch (error) {

        console.log(error);
        alert("Upload Failed");

      }
    }
  };

  // DELETE NOTES
  const deleteFile = (indexToDelete) => {

    const updatedFiles = uploadedFiles.filter(
      (_, index) => index !== indexToDelete
    );

    setUploadedFiles(updatedFiles);
  };

  return (

    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-green-500">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <h1 className="text-3xl font-extrabold text-green-400">
            ANJAN CYBER
          </h1>

          <div className="hidden md:flex gap-8 text-lg">

            <a href="#home" className="hover:text-green-400">
              Home
            </a>

            <a href="#notes" className="hover:text-green-400">
              Notes
            </a>

            <a href="#upload" className="hover:text-green-400">
              Upload
            </a>

            <a href="#personal" className="hover:text-green-400">
              Personal
            </a>

          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="flex items-center justify-center min-h-screen px-6 text-center"
      >

        <div className="max-w-5xl">

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            Welcome To My

            <span className="text-green-400">
              {" "}Cyber Security
            </span>

            {" "}Website

          </h2>

          <p className="text-lg md:text-2xl text-gray-300 leading-9 max-w-4xl mx-auto">

            Upload and access cyber security notes,
            PDFs, images and study materials.

          </p>

        </div>
      </section>

      {/* NOTES */}
      <section id="notes" className="py-24 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">

            <h3 className="text-5xl font-bold text-green-400 mb-5">
              Uploaded Notes
            </h3>

          </div>

          {uploadedFiles.length === 0 ? (

            <p className="text-center text-gray-400 text-xl">
              No files uploaded yet.
            </p>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {uploadedFiles.map((file, index) => (

                <div
                  key={index}
                  className="bg-[#0b0b0b] border border-green-500 rounded-3xl p-8"
                >

                  <h4 className="text-2xl font-bold text-green-400 mb-4 break-words">
                    {file.name}
                  </h4>

                  <div className="flex flex-col gap-3">

                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >

                      <button className="w-full bg-green-400 text-black py-3 rounded-2xl font-bold">
                        Open Notes
                      </button>

                    </a>

                    <button
                      onClick={() => deleteFile(index)}
                      className="w-full bg-red-500 text-white py-3 rounded-2xl font-bold"
                    >
                      Delete File
                    </button>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      {/* UPLOAD */}
      <section
        id="upload"
        className="py-24 px-6 bg-[#050505]"
      >

        <div className="max-w-6xl mx-auto text-center">

          <h3 className="text-5xl font-bold text-green-400 mb-6">
            Upload Notes & Images
          </h3>

          <div className="border-2 border-dashed border-green-500 rounded-3xl p-16 bg-black">

            <input
              id="fileUpload"
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
            />

            <label
              htmlFor="fileUpload"
              className="bg-green-400 text-black px-10 py-4 rounded-2xl font-bold text-lg cursor-pointer inline-block"
            >
              Choose Files
            </label>

          </div>

        </div>
      </section>

      {/* PERSONAL SECTION */}
      <section
        id="personal"
        className="py-24 px-6"
      >

        <div className="max-w-6xl mx-auto text-center">

          <h3 className="text-5xl font-bold text-green-400 mb-10">
            Personal Details
          </h3>

          {!personalAccess ? (

            <div className="max-w-md mx-auto bg-[#050505] border border-green-500 p-10 rounded-3xl">

              <input
                type="password"
                placeholder="Enter Password"
                value={personalPassword}
                onChange={(e) => setPersonalPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black border border-green-500 text-white outline-none mb-6"
              />

              <button
                onClick={() => {

                  if (personalPassword === PERSONAL_PASSWORD) {

                    setPersonalAccess(true);

                  } else {

                    alert("Wrong Password");

                  }

                }}
                className="w-full bg-green-400 text-black py-3 rounded-xl font-bold"
              >
                Open Personal Details
              </button>

            </div>

          ) : (

            <div>

              <div className="mb-10">

                <input
                  id="personalImageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePersonalImageUpload}
                  className="hidden"
                />

                <label
                  htmlFor="personalImageUpload"
                  className="bg-green-400 text-black px-10 py-4 rounded-2xl font-bold text-lg cursor-pointer inline-block"
                >
                  Upload Personal Images
                </label>

              </div>

              <div className="grid md:grid-cols-3 gap-8">

                {personalImages.map((image, index) => (

                  <div
                    key={index}
                    className="border border-green-500 rounded-3xl overflow-hidden"
                  >

                    <img
                      src={image}
                      alt="personal"
                      className="w-full h-80 object-cover"
                    />

                  </div>
                ))}

              </div>

            </div>

          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-green-500 py-8 text-center text-gray-400 bg-black">
        © 2026 ANJAN CYBER SECURITY
      </footer>

    </div>
  );
}