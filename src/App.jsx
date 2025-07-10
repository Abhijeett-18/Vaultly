import { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import List from "./components/List";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

function App() {
  const [passwords, setPasswords] = useState(() => {
    const saved = localStorage.getItem("vaultly-data");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("vaultly-data", JSON.stringify(passwords));
  }, [passwords]);

  const handleAdd = (entry) => {
    setPasswords((prev) => [entry, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1E1E1E] text-white">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow pb-28 px-4 py-6">
        <Form onAdd={handleAdd} />
        <List
          passwords={passwords}
          setPasswords={setPasswords}
          searchQuery={searchQuery}
        />
      </main>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
