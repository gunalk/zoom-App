import { useEffect, useState } from "react";
import zoomSdk from "@zoom/appssdk";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initZoomApp() {
      // Only try to init if inside Zoom
      const isZoom = window?.navigator?.userAgent.includes("Zoom");
  
      if (!isZoom) {
        console.warn("Not running inside Zoom client");
        setUserName("Zoom User (local dev)");
        setBackendMessage("Running outside Zoom, SDK not available.");
        setLoading(false);
        return;
      }
  
      try {
        await zoomSdk.config({
          capabilities: ["getUserContext"],
          version: "0.16.0",
        });
  
        const context = await zoomSdk.getUserContext();
        const name = context?.displayName || "Zoom User";
        setUserName(name);
  
        await fetch("http://localhost:5000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        });
  
        const res = await fetch("http://localhost:5000/api/hello");
        const data = await res.json();
        setBackendMessage(data.message);
      } catch (err) {
        console.error("Error initializing Zoom App:", err);
      } finally {
        setLoading(false);
      }
    }
  
    initZoomApp();
  }, []);
  

  if (loading) {
    return <div className="container"><p>Loading...</p></div>;
  }

  console.log("userName",userName)

  return (
    <div className="container">
      <h1>🚀 Welcome to My Zoom App!</h1>
      <p>Hello, <strong>{userName}</strong> 👋</p>
      <p style={{ marginTop: "20px", color: "#888" }}>{backendMessage}</p>
    </div>
  );
}

export default App;
