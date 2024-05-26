"use client";

import { useEffect, useState } from "react";

export default function AdminComponent() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = async (userId: string) => {
    try {
      await fetch("/api/banUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleEditUser = async (userId: string) => {
    const name = prompt("Enter new name:");
    const username = prompt("Enter new username:");
    const email = prompt("Enter new email:");
    try {
      await fetch("/api/editUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, name, username, email }),
      });
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, name, username, email } : user
        )
      );
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  return (
    <section className="mx-auto my-10 space-y-3">
      <h1 className="text-center text-xl font-bold">Admin Page</h1>
      <p className="text-center">Welcome, admin!</p>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="p-4 border rounded">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Joined:</strong>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleEditUser(user.id)}
                className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleBanUser(user.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Ban
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
