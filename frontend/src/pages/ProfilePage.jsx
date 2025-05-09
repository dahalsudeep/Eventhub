import { useEffect, useState } from "react";
import userService from '../services/userService'
import Button from "../components/common/Button";
import Spinner from "../components/common/Spinner";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [usersList, setUsersList] = useState([]); // Admin view
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userData = await userService.getUserProfile();
        setUser(userData);
        setFormData({ name: userData.name, email: userData.email });

        if (userData.role === "admin") {
          const users = await userService.getAllUsers();
          setUsersList(users);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      await userService.updateUserProfile(formData);
      setUser({ ...user, ...formData });
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const handleChangePassword = async () => {
    try {
      await userService.changePassword(passwordData);
      setPasswordData({ oldPassword: "", newPassword: "" });
      alert("Password changed successfully!");
    } catch (err) {
      console.error("Error changing password:", err);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Profile</h2>
        {user ? (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              {editMode ? (
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              ) : (
                <p className="text-gray-900">{user.name}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              {editMode ? (
                <input
                  type="email"
                  className="w-full border p-2 rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>
            <p className="text-gray-700 mb-4">Role: <strong>{user.role}</strong></p>

            {editMode ? (
              <div className="flex gap-4">
                <Button onClick={handleUpdateProfile}>Save</Button>
                <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
              </div>
            ) : (
              <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
            )}

            {/* Change Password */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Change Password</h3>
              <input
                type="password"
                placeholder="Old Password"
                className="w-full border p-2 rounded mb-2"
                value={passwordData.oldPassword}
                onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full border p-2 rounded mb-2"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
              <Button onClick={handleChangePassword}>Update Password</Button>
            </div>

            {/* Admin View - List of Users */}
            {user.role === "admin" && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">User Management</h3>
                <ul className="border rounded p-4">
                  {usersList.map((usr) => (
                    <li key={usr._id} className="p-2 border-b">{usr.name} - {usr.email} ({usr.role})</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600">User not found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
