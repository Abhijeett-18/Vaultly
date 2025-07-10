import { useState } from "react";
import toast from "react-hot-toast";

export default function List({ passwords, setPasswords, searchQuery }) {
  const [editIndex, setEditIndex] = useState(null);
  const [showIndex, setShowIndex] = useState(null);
  const [editedEntry, setEditedEntry] = useState({
    site: "",
    username: "",
    password: "",
  });

  const handleDelete = (index) => {
    const updated = [...passwords];
    updated.splice(index, 1);
    setPasswords(updated);
    toast.success("Password deleted!", {
      duration: 2000,
      style: { background: "#333", color: "#fff" },
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Password copied!", {
      duration: 2000,
      style: { background: "#333", color: "#fff" },
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedEntry(passwords[index]);
  };

  const handleSave = () => {
    const updated = [...passwords];
    updated[editIndex] = editedEntry;
    setPasswords(updated);
    setEditIndex(null);
    toast.success("Password saved!", {
      duration: 2000,
      style: { background: "#333", color: "#fff" },
    });
  };

  const filtered = passwords.filter((entry) =>
    entry.site.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (passwords.length === 0) {
    return (
      <>
        <p className="mx-4 text-yellow-50 mt-10 text-3xl font-bold">
          Your Passwords
        </p>
        <p className="text-yellow-50 mx-4 mt-4">
          You have no saved passwords yet*
        </p>
      </>
    );
  }

  if (filtered.length === 0) {
    return (
      <>
        <p className="mx-4 text-yellow-50 mt-10 text-3xl font-bold">
          Your Passwords
        </p>
        <p className="text-yellow-50 mx-4 mt-4">No matching sites found*</p>
      </>
    );
  }

  return (
    <div className="mt-10 space-y-3">
      <h2 className="mx-4 text-yellow-50 mt-10 text-3xl font-bold">
        Your Passwords
      </h2>

      {filtered.map((entry, i) => (
        <div key={i} className="mx-4">
          <div className="bg-gray-800 text-white p-4 rounded flex flex-col sm:flex-row justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px] break-words">
              {editIndex === i ? (
                <div className="flex flex-col gap-2">
                  <input
                    className="bg-orange-50 text-stone-900 p-2 rounded"
                    value={editedEntry.site}
                    onChange={(e) =>
                      setEditedEntry({ ...editedEntry, site: e.target.value })
                    }
                  />
                  <input
                    className="bg-orange-50 text-stone-900 p-2 rounded"
                    value={editedEntry.username}
                    onChange={(e) =>
                      setEditedEntry({
                        ...editedEntry,
                        username: e.target.value,
                      })
                    }
                  />
                  <input
                    className="bg-orange-50 text-stone-900 p-2 rounded"
                    value={editedEntry.password}
                    onChange={(e) =>
                      setEditedEntry({
                        ...editedEntry,
                        password: e.target.value,
                      })
                    }
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <p>
                    <strong>Site:</strong> {entry.site}
                  </p>
                  <p>
                    <strong>User:</strong> {entry.username}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p>
                      <strong>Pass:</strong>{" "}
                      {showIndex === i
                        ? entry.password
                        : "•".repeat(entry.password.length)}
                    </p>
                    <button
                      onClick={() =>
                        setShowIndex(showIndex === i ? null : i)
                      }
                      className="text-xs px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
                    >
                      {showIndex === i ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {editIndex === i ? (
                <button
                  onClick={handleSave}
                  className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleCopy(entry.password)}
                    className="bg-blue-800 hover:bg-blue-900 px-3 py-1 rounded"
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => handleEdit(i)}
                    className="bg-green-800 hover:bg-green-900 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="bg-red-800 hover:bg-red-900 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
          {i !== filtered.length - 1 && (
            <hr className="border-t border-gray-600 opacity-40 my-2" />
          )}
        </div>
      ))}
    </div>
  );
}
