import React, { useState, useEffect } from "react";
import { Button, TextInput, Label, Alert, Select, FileInput } from "flowbite-react";
import axios from "axios";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ROLES = ["vc", "director", "deputy", "bursar", "registrar",
"library","depIct","acad"
]; // adjust to match your backend
const ROLE_FIELDS = {
  vc: ["name", "post", "email","description"],
  director: ["name", "post", "email","description"],
  deputy: ["name", "post", "email","description"],
  bursar: ["name", "post", "email","description",],
  registrar: ["name", "post", "email","description"],
  library: ["name", "post", "email","description",],
  depIct: ["name", "post", "email","description",],
  acad: ["name", "post", "email","description",],
  
};

export default function DashStaff() {
  const [selectedRole, setSelectedRole] = useState("vc");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError("");
    setSuccess("");
    fetch(`/api/staff/${selectedRole}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch staff data");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        setError(err.message);
        setFormData({});
      })
      .finally(() => setLoading(false));
  }, [selectedRole]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImageFile(file);
  }

  const uploadImage = async (file, setProgress) => {
    const cloudname = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    try {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "codelWebImagesPreset");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        imageData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      setUploadError(null);
      setProgress(0);
      return res.data.secure_url;
    } catch (error) {
      setUploadError("Error uploading image");
      setProgress(0);
      return null;
    }
  };

  const handleUploadImage = async () => {
    if (!imageFile) return;
    const url = await uploadImage(imageFile, setUploadProgress);
    if (url) setFormData((prev) => ({ ...prev, photo: url }));
  };

  async function handleSave() {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");

      const payload = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) return;
        payload[key] = value;
      });

      const res = await fetch(`/api/staff/${selectedRole}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to save");
      }

      setSuccess("Staff updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Staff Management</h1>

      <div className="mb-6 max-w-xs">
        <Label htmlFor="role-select" className="mb-2">
          Select Role
        </Label>
        <Select
          id="role-select"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <p>Loading staff data...</p>
      ) : error ? (
        <Alert color="failure" onDismiss={() => setError("")}>
          {error}
        </Alert>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          {ROLE_FIELDS[selectedRole]?.map((field) => (
            <div key={field}>
              <Label htmlFor={field} className="mb-1 capitalize">
                {field}
              </Label>
              <TextInput
                id={field}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="flex flex-col gap-3 w-full max-w-md">
            <Label className="mb-1">Staff Image</Label>
            <FileInput
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            <Button
              type="button"
              size="sm"
              outline
              onClick={handleUploadImage}
              disabled={uploadProgress}
            >
              {uploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={uploadProgress} text={`${uploadProgress || 0}%`} />
                </div>
              ) : (
                "Upload image"
              )}
            </Button>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </form>
      )}

      {success && (
        <Alert color="success" className="mt-4" onDismiss={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      {uploadError && (
        <Alert color="failure" className="mt-4" onDismiss={() => setUploadError(null)}>
          {uploadError}
        </Alert>
      )}
    </div>
  );
}
