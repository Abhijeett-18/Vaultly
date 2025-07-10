import { useState } from "react";
import toast from "react-hot-toast";

export default function Form({ onAdd }) {
  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const websitePattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-z]{2,}$/;

    if (!site.trim()) {
      toast.error("Website is required", {
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    if (!websitePattern.test(site.trim())) {
      toast.error("Enter a valid website URL", {
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    if (!username.trim()) {
      toast.error("Username is required", {
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required", {
        duration: 2000,
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    onAdd({ site, username, password });
    setSite("");
    setUsername("");
    setPassword("");

    toast.success("Password saved!", {
      duration: 2000,
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <section className="text-center mt-4">
      <h1 className="text-5xl font-bold text-yellow-50 mb-4">Vaultly</h1>
      <p className="text-yellow-50 mb-6 text-sm">
        Manage and secure your Passwords
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3"
      >
        <input
          type="text"
          placeholder="Website"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          className="bg-orange-50 text-stone-900 font-semibold p-2 rounded-md w-65 mb-2"
        />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-orange-50 text-stone-900 font-semibold p-2 rounded-md w-31"
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-orange-50 text-stone-900 font-semibold p-2 rounded-md w-31"
          />
        </div>

        <button
          type="submit"
          className="bg-green-800 text-yellow-50 px-6 py-2 rounded-md hover:bg-green-900 mt-2 w-65 font-semibold"
        >
          Save Password
        </button>
      </form>
    </section>
  );
}
