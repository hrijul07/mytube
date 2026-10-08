"use client";

import React, { useMemo, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface UploadForm {
  title: string;
  description: string;
  category: string;
}

const defaultForm: UploadForm = {
  title: "",
  description: "",
  category: "General",
};

const VideoUploader = () => {
  const [form, setForm] = useState<UploadForm>(defaultForm);

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const videoPreview = useMemo(() => {
    if (!videoFile) return "";
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  const thumbnailPreview = useMemo(() => {
    if (!thumbnailFile) return "";
    return URL.createObjectURL(thumbnailFile);
  }, [thumbnailFile]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDescription = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleVideo = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setVideoFile(e.target.files[0]);
    setError("");
  };

  const handleThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setThumbnailFile(e.target.files[0]);
    setError("");
  };

  const resetForm = () => {
    setForm(defaultForm);
    setVideoFile(null);
    setThumbnailFile(null);
    setProgress(0);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!videoFile) {
      setError("Please choose a video.");
      return;
    }

    if (!thumbnailFile) {
      setError("Please choose a thumbnail.");
      return;
    }

    try {
      setUploading(true);

      const data = new FormData();

      data.append("title", form.title);
      data.append("description", form.description);
      data.append("category", form.category);

      data.append("video", videoFile);
      data.append("thumbnail", thumbnailFile);

      await axios.post(`${API_URL}/video/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress(progressEvent) {
          if (!progressEvent.total) return;

          const percent = Math.round(
            (progressEvent.loaded * 100) /
              progressEvent.total
          );

          setProgress(percent);
        },
      });

      setMessage("Video uploaded successfully.");

      resetForm();
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          "Upload failed."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-xl border bg-white dark:bg-neutral-900 shadow-md p-6">

        <h2 className="text-3xl font-bold mb-6">
          Upload Video
        </h2>

        <form
          onSubmit={submitHandler}
          className="space-y-6"
        >
          <div>
            <label className="font-medium block mb-2">
              Title
            </label>

            <Input
              name="title"
              value={form.title}
              onChange={handleInputChange}
              placeholder="Video title"
              required
            />
          </div>

          <div>
            <label className="font-medium block mb-2">
              Description
            </label>

            <Textarea
              rows={6}
              value={form.description}
              onChange={handleDescription}
              placeholder="Tell viewers about your video..."
            />
          </div>

          <div>
            <label className="font-medium block mb-2">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-3 dark:bg-neutral-800"
            >
              <option>General</option>
              <option>Gaming</option>
              <option>Music</option>
              <option>Education</option>
              <option>Technology</option>
              <option>Entertainment</option>
              <option>Sports</option>
              <option>News</option>
            </select>
          </div>
                    <div>
            <label className="font-medium block mb-2">
              Video File
            </label>

            <Input
              type="file"
              accept="video/*"
              onChange={handleVideo}
            />

            {videoFile && (
              <div className="mt-4">
                <video
                  controls
                  src={videoPreview}
                  className="w-full rounded-lg border"
                />
              </div>
            )}
          </div>

          <div>
            <label className="font-medium block mb-2">
              Thumbnail
            </label>

            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
            />

            {thumbnailFile && (
              <div className="mt-4">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-72 rounded-lg border"
                />
              </div>
            )}
          </div>

          {uploading && (
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-green-100 text-green-700 p-3">
              {message}
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-100 text-red-700 p-3">
              {error}
            </div>
          )}

          <div className="flex gap-4">

            <Button
              type="submit"
              disabled={uploading}
              className="flex-1"
            >
              {uploading
                ? "Uploading..."
                : "Upload Video"}
            </Button>

            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              onClick={resetForm}
            >
              Reset
            </Button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default VideoUploader;