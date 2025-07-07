import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const CATEGORY_URL = `${BASE_URL}/api/categories`;
const EDIT_EVENT_URL = `${BASE_URL}/api/events/edit`;

const EditEventModal = ({ event, token, onClose, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description,
    location: event.location,
    price: event.price,
    capacity: event.capacity,
    categoryId: "",
    date: event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    latitude: event.latitude,
    longitude: event.longitude,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORY_URL);
        setCategories(response.data);
        // Auto-select category if available
        const selectedCategory = response.data.find(
          (cat) => cat.name === event.categoryName
        );
        if (selectedCategory) {
          setFormData((prev) => ({
            ...prev,
            categoryId: selectedCategory.id,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, [event.categoryName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }

      await axios.put(`${EDIT_EVENT_URL}/${event.id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Event updated successfully!", { autoClose: 2000 });
      onUpdate();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update event", { autoClose: 2000 });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md backdrop-saturate-150">
      <div className="bg-[#e9cbf0] rounded-2xl p-6 w-full max-w-2xl shadow-2xl border border-gray-300 font-RobotoSlab">
        <h2 className="text-2xl font-bold text-[#5e1c6a] mb-6 text-center">
          Edit Event
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
                required
              />
            </div>

            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
                required
              />
            </div>
            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
                required
              />
            </div>

            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Capacity (Seats)
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
                required
              />
            </div>
            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Category
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
                required
              />
            </div>

            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
                required
              />
            </div>

            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
                required
              />
            </div>

            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Latitude
              </label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
              />
            </div>

            <div>
              <label className="block text-[#5e1c6a] font-medium mb-1">
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="w-full p-2 rounded border border-gray-400 focus:outline-[#5e1c6a]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#5e1c6a] font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-400 p-2 rounded focus:outline-[#5e1c6a]"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-400 text-white rounded-full shadow hover:scale-95 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#5e1c6a] text-white font-semibold rounded-full shadow hover:bg-[#704677] hover:scale-95 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
