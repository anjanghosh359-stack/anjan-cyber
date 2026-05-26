import { useEffect, useState } from "react";

const CLOUD_NAME = "dgqwfg5mp";
const UPLOAD_PRESET = "ndzksccj";

export default function CyberSecurityWebsite() {

  // PASSWORD SYSTEM
  const [access, setAccess] = useState(false);
  const [password, setPassword] = useState("");

  const WEBSITE_PASSWORD = "anjan123";

  // FILE STORAGE
  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const saved = localStorage.getItem("uploadedFiles");
    return saved ? JSON.parse(saved) : [];
  });

  // SAVE FILES
  useEffect(() => {
    localStorage.setItem(
      "uploadedFiles",
      JSON.stringify(uploadedFiles)
    );
  }, [uploadedFiles]);

  // FILE UPLOAD
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

        } else {

          alert("Upload Failed");
          console.log(data);

        }

      } catch (error) {

        console.log(error);
        alert("Error Uploading File");

      }
    }
  };

  // DELETE FILE
  const deleteFile = (indexToDelete) => {

    const updatedFiles = uploadedFiles.filter(
      (_, index) => index !== indexToDelete
    );

    setUploadedFiles(updatedFiles);
  };

  // PASSWORD PAGE
  if (!access) {

    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-6">

        <div className="bg-[#050505] border border-green-500 p-10 rounded-3xl w-full max-w-md text-center">

          <h2 className="text-4xl font-bold text-green-400 mb-6">
            Protected Website
          </h2>

          <p className="text-gray-300 mb-6">
            Enter Password To Access
          </p>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-black border border-green-500 text-white outline-none mb-6"
          />

          <button
            onClick={() => {

              if (password === WEBSITE_PASSWORD) {

                setAccess(true);

              } else {

                alert("Wrong Password");

              }

            }}
            className="w-full bg-green-400 text-black py-3 rounded-xl font-bold hover:bg-white transition"
          >
            Enter Website
          </button>

        </div>
      </div>
    );
  }

  return (

    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-green-500">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <h1 className="text-3xl font-extrabold text-green-400 tracking-wider">
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

            <a href="#contact" className="hover:text-green-400">
              Contact
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

          <p className="text-green-400 text-xl mb-4 tracking-[5px]">
            CYBER SECURITY • ETHICAL HACKING • NETWORKING
          </p>

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

            <p className="text-gray-400 text-lg">
              Open uploaded PDFs and study materials.
            </p>

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

                  <div className="w-16 h-16 rounded-2xl bg-green-400 text-black flex items-center justify-center text-3xl font-black mb-6">
                    {index + 1}
                  </div>

                  <h4 className="text-2xl font-bold text-green-400 mb-4 break-words">
                    {file.name}
                  </h4>

                  <p className="text-gray-300 mb-6">
                    Uploaded Study Material
                  </p>

                  <div className="flex flex-col gap-3">

                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >

                      <button className="w-full bg-green-400 text-black py-3 rounded-2xl font-bold hover:bg-white transition">
                        Open Notes
                      </button>

                    </a>

                    <button
                      onClick={() => deleteFile(index)}
                      className="w-full bg-red-500 text-white py-3 rounded-2xl font-bold hover:bg-red-700 transition"
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

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-8 mb-10">
            Upload PDFs, screenshots and cyber security notes.
          </p>

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
              className="bg-green-400 text-black px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white transition duration-300 cursor-pointer inline-block"
            >
              Choose Files
            </label>

          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">

        <div className="max-w-5xl mx-auto bg-[#050505] border border-green-500 rounded-[40px] p-12 text-center">

          <h3 className="text-5xl font-bold text-green-400 mb-8">
            Contact Me
          </h3>

          <div className="space-y-5 text-xl text-gray-300">

            <p>
              📧 Email: anjanghosh359@gmail.com
            </p>

            <p>
              💻 GitHub: github.com/anjanghosh359-stack
            </p>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-green-500 py-8 text-center text-gray-400 bg-black">
        © 2026 ANJAN CYBER SECURITY
      </footer>

    </div>
  );
}