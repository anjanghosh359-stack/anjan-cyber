import { useState } from "react";

const CLOUD_NAME = "dgqwfg5mp";
const UPLOAD_PRESET = "ndzksccj";

export default function CyberSecurityWebsite() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Upload Function
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const resourceType =
        file.type === "application/pdf" ? "raw" : "image";

      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setUploadedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          url: data.secure_url,
          type: file.type,
        },
      ]);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00ff99_0,_transparent_70%)]"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-green-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-3xl font-extrabold text-green-400 tracking-wider">
            ANJAN CYBER
          </h1>

          <div className="hidden md:flex gap-8 text-lg">
            <a href="#home" className="hover:text-green-400 transition">
              Home
            </a>

            <a href="#about" className="hover:text-green-400 transition">
              About
            </a>

            <a href="#notes" className="hover:text-green-400 transition">
              Notes
            </a>

            <a href="#gallery" className="hover:text-green-400 transition">
              Upload
            </a>

            <a href="#contact" className="hover:text-green-400 transition">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="relative flex items-center justify-center min-h-screen px-6 text-center"
      >
        <div className="max-w-5xl">
          <p className="text-green-400 text-xl mb-4 tracking-[5px]">
            CYBER SECURITY • ETHICAL HACKING • NETWORKING
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">
            Welcome To My{" "}
            <span className="text-green-400">Cyber Security</span> Website
          </h2>

          <p className="text-lg md:text-2xl text-gray-300 leading-9 max-w-4xl mx-auto">
            A professional cyber security learning platform where I upload
            notes, cybersecurity resources, ethical hacking topics,
            networking concepts, study materials and technical content.
          </p>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-5xl font-bold mb-8 text-green-400">
              About Me
            </h3>

            <p className="text-gray-300 text-lg leading-9 mb-6">
              Hello, I am Anjan Ghosh, a student of Advanced Networking and
              Cyber Security.
            </p>

            <p className="text-gray-300 text-lg leading-9">
              I share notes, cyber security concepts, networking resources,
              penetration testing knowledge and cybersecurity updates.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-black border border-green-500 rounded-3xl p-8">
              <h4 className="text-2xl font-bold text-green-400 mb-3">
                Ethical Hacking
              </h4>

              <p className="text-gray-300">
                Security testing and penetration testing concepts.
              </p>
            </div>

            <div className="bg-black border border-green-500 rounded-3xl p-8">
              <h4 className="text-2xl font-bold text-green-400 mb-3">
                Networking
              </h4>

              <p className="text-gray-300">
                Advanced networking and cyber defense concepts.
              </p>
            </div>

            <div className="bg-black border border-green-500 rounded-3xl p-8">
              <h4 className="text-2xl font-bold text-green-400 mb-3">
                Linux
              </h4>

              <p className="text-gray-300">
                Linux security and administration.
              </p>
            </div>

            <div className="bg-black border border-green-500 rounded-3xl p-8">
              <h4 className="text-2xl font-bold text-green-400 mb-3">
                Forensics
              </h4>

              <p className="text-gray-300">
                Digital investigation and forensic analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Uploaded Notes */}
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
                    Uploaded cyber security material
                  </p>

                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className="w-full bg-green-400 text-black py-3 rounded-2xl font-bold hover:bg-white transition">
                      Open Notes
                    </button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upload Section */}
      <section id="gallery" className="py-24 px-6 bg-[#050505]">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-5xl font-bold text-green-400 mb-6">
            Upload Notes & Images
          </h3>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-8 mb-10">
            Upload PDFs, screenshots, notes and cybersecurity resources.
          </p>

          <div className="border-2 border-dashed border-green-500 rounded-3xl p-16 bg-black">
            <p className="text-2xl text-gray-300 mb-5">
              Upload Your Files
            </p>

            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="mb-6 text-white"
            />

            <br />

            <label className="bg-green-400 text-black px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white transition duration-300 cursor-pointer inline-block">
              Choose Files
            </label>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#050505] border border-green-500 rounded-[40px] p-12 text-center shadow-2xl">
          <h3 className="text-5xl font-bold text-green-400 mb-8">
            Contact Me
          </h3>

          <div className="space-y-5 text-xl text-gray-300">
            <p>📧 Email: anjanghosh359@gmail.com</p>
            <p>💻 GitHub: github.com/anjanghosh359-stack</p>
            <p>🌐 Cyber Security Portfolio</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500 py-8 text-center text-gray-400 bg-black">
        © 2026 ANJAN CYBER SECURITY | All Rights Reserved
      </footer>
    </div>
  );
}