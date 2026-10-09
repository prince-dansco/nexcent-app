// import FeatureSectionOne from "./components/global-Component/featureSectionOne";
// import HeroSection from "./components/global-Component/HeroSection";
// import Navbar from "./components/global-Component/Navbar";
// import ServicesSection from "./components/global-Component/ServicesSection";

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <HeroSection />
//       <ServicesSection/>
//       <FeatureSectionOne />

//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regMessage, setRegMessage] = useState(null);

const [loginUsername, setLoginUsername] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [loginMessage, setLoginMessage] = useState(null);
const [currentUser, setCurrentUser] = useState(null);

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  async function fetchTasks(url) {
    try {
      const resp = await fetch(url || "http://localhost:8000/api/tasks/", {
        credentials: "include",
      });
      if (!resp.ok) throw new Error("Failed to fetch tasks");
      const data = await resp.json();

      // DRF pagination: count, next, previous, results
      setTasks(data.results || []);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
      setTotalCount(data.count ?? 0);
    } catch (e) {
      setError(e.message);
    }
  }

  async function createTask() {
    try {
      const resp = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify({ title }),
      });
      if (!resp.ok) throw new Error("Failed to create task");
      const data = await resp.json();
      setTasks((prev) => [...prev, data]);
      setTitle("");
    } catch (e) {
      setError(e.message);
    }
  }

  async function toggleTask(id) {
    try {
      const resp = await fetch(
        `http://localhost:8000/api/tasks/${id}/toggle-completed/`,
        {
          method: "POST",
          headers: {
            "X-CSRFToken": getCookie("csrftoken"),
          },
          credentials: "include",
        },
      );
      if (!resp.ok) throw new Error("Failed to toggle task");
      const updated = await resp.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (e) {
      setError(e.message);
    }
  }

  async function deleteTask(id) {
    try {
      const resp = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: "DELETE",
        headers: {
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
      });

      if (!resp.ok && resp.status !== 204) {
        const body = await resp.text();
        console.error("Delete error body:", body);
        throw new Error(`Failed to delete task: ${resp.status}`);
      }

      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setError(e.message);
    }
  }

  async function updateTask(id, newTitle) {
    try {
      const resp = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify({ title: newTitle }),
      });

      if (!resp.ok) {
        const body = await resp.text();
        console.error("Update error body:", body);
        throw new Error(`Failed to update task: ${resp.status}`);
      }

      const updated = await resp.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
      setEditingId(null);
      setEditingTitle("");
    } catch (e) {
      setError(e.message);
    }
  }

  async function registerUser() {
    try {
      setRegMessage(null);
      const resp = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify({
          username: regUsername,
          password: regPassword,
        }),
      });

      if (!resp.ok) {
        const data = await resp.json().catch(() => null);
        const msg =
          data && data.username
            ? `Error: ${data.username.join(" ")}`
            : `Failed to register user (${resp.status})`;
        throw new Error(msg);
      }

      const data = await resp.json();
      setRegMessage(`User created: ${data.username}`);
      setRegUsername("");
      setRegPassword("");
    } catch (e) {
      setRegMessage(e.message);
    }
  }

async function loginUser() {
  try {
    setLoginMessage(null);
    const resp = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      credentials: "include",
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => null);
      const msg =
        data && data.detail
          ? `Login failed: ${data.detail}`
          : `Login failed (${resp.status})`;
      throw new Error(msg);
    }

    const data = await resp.json();
    setCurrentUser(data);
    setLoginMessage(`Logged in as ${data.username}`);
    setLoginUsername("");
    setLoginPassword("");

    // Refresh tasks for this user
    fetchTasks();
  } catch (e) {
    setLoginMessage(e.message);
    setCurrentUser(null);
  }
}

async function logoutUser() {
  try {
    const resp = await fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
      credentials: "include",
    });
    // Even if backend returns 401/403, clear UI state
    setCurrentUser(null);
    setLoginMessage("Logged out.");
    setTasks([]);
  } catch (e) {
    setLoginMessage("Error logging out.");
  }
}

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{ maxWidth: 500, margin: "40px auto", fontFamily: "system-ui" }}
    >
      <h1>Todo App (React + Django)</h1>

      <div
        style={{
          marginBottom: 24,
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 6,
          background: "#fafafa",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", marginBottom: 8 }}>
          Register new user
        </h2>

        {regMessage && (
          <p
            style={{
              color: regMessage.startsWith("User created") ? "green" : "red",
            }}
          >
            {regMessage}
          </p>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
          <input
            type="text"
            placeholder="Username"
            value={regUsername}
            onChange={(e) => setRegUsername(e.target.value)}
            style={{ padding: 6, flex: 1 }}
          />
          <input
            type="password"
            placeholder="Password"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            style={{ padding: 6, flex: 1 }}
          />
        </div>
        <button onClick={registerUser}>Register</button>
      </div>

<div
  style={{
    marginBottom: 24,
    padding: 12,
    border: "1px solid #ddd",
    borderRadius: 6,
    background: "#f0f7ff",
  }}
>
  <h2 style={{ fontSize: "1.1rem", marginBottom: 8 }}>Login</h2>

  {loginMessage && (
    <p style={{ color: loginMessage.startsWith("Logged in") ? "green" : "red" }}>
      {loginMessage}
    </p>
  )}

  {currentUser ? (
    <div style={{ marginBottom: 8 }}>
      <span style={{ marginRight: 8 }}>Current user: {currentUser.username}</span>
      <button onClick={logoutUser}>Logout</button>
    </div>
  ) : (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input
          type="text"
          placeholder="Username"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
          style={{ padding: 6, flex: 1 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          style={{ padding: 6, flex: 1 }}
        />
      </div>
      <button onClick={loginUser}>Login</button>
    </>
  )}
</div>


      {error && <p style={{ color: "red" }}>{error}</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task title"
          style={{ padding: 8, marginRight: 8, width: 200 }}
        />
        <button onClick={createTask}>Add</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 8,
                padding: 8,
                background: "#f5f5f5",
                borderRadius: 6,
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{ marginRight: 8 }}
              />

              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    style={{ flex: 1, marginRight: 8, padding: 4 }}
                  />
                  <button
                    onClick={() => updateTask(task.id, editingTitle)}
                    style={{ marginRight: 4 }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingTitle("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{
                      flex: 1,
                      textDecoration: task.completed ? "line-through" : "none",
                      color: task.completed ? "rgb(180, 180, 180)" : "inherit",
                    }}
                  >
                    {task.title}
                  </span>
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditingTitle(task.title);
                    }}
                    style={{ marginRight: 4 }}
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
      <div
        style={{
          marginTop: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          disabled={!prevPageUrl}
          onClick={() => prevPageUrl && fetchTasks(prevPageUrl)}
        >
          Previous
        </button>

        <span>Total: {totalCount}</span>

        <button
          disabled={!nextPageUrl}
          onClick={() => nextPageUrl && fetchTasks(nextPageUrl)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
