import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function VolunteerForm() {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    age: "",
    gender: "",
    occupation: "",
    skills: [],
    interests: [],
    availability: "",
    experience: "",
  });

  const skillsList = [
    "React",
    "Node.js",
    "MongoDB",
    "Java",
    "Python",
    "C++",
    "Teaching",
    "Photography",
    "Public Speaking",
    "Event Management",
  ];

  const interestsList = [
    "Education",
    "Healthcare",
    "Environment",
    "Animal Welfare",
    "Community Service",
    "Women Empowerment",
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/volunteers/me");

      if (res.data) {
        setFormData({
          phone: res.data.phone || "",
          address: res.data.address || "",
          age: res.data.age || "",
          gender: res.data.gender || "",
          occupation: res.data.occupation || "",
          skills: res.data.skills || [],
          interests: res.data.interests || [],
          availability: res.data.availability || "",
          experience: res.data.experience || "",
        });

        setEditMode(true);
      }
    } catch (err) {
      console.log("No volunteer profile found.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckbox = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (editMode) {
        await api.put("/volunteers/me", formData);

        toast.success("Profile Updated Successfully");
      } else {
        await api.post("/volunteers", formData);

        toast.success("Volunteer Application Submitted");

        setEditMode(true);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Volunteer Application Form
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* Personal Information */}

          <div>

            <h2 className="text-xl font-semibold mb-4">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded-lg p-3"
                required
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

            </div>

            <textarea
              name="address"
              rows="3"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full mt-6"
              required
            />

          </div>

          {/* Skills */}

          <div>

            <h2 className="text-xl font-semibold mb-4">
              Skills
            </h2>

            <div className="grid md:grid-cols-3 gap-3">
                              {skillsList.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 border rounded-lg p-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleCheckbox("skills", skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>

          </div>

          {/* Interests */}

          <div>

            <h2 className="text-xl font-semibold mb-4">
              Interests
            </h2>

            <div className="grid md:grid-cols-3 gap-3">

              {interestsList.map((interest) => (
                <label
                  key={interest}
                  className="flex items-center gap-2 border rounded-lg p-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() =>
                      handleCheckbox("interests", interest)
                    }
                  />
                  {interest}
                </label>
              ))}

            </div>

          </div>

          {/* Availability */}

          <div>

            <h2 className="text-xl font-semibold mb-4">
              Availability
            </h2>

            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
              required
            >
              <option value="">Select Availability</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Both">Both</option>
            </select>

          </div>

          {/* Experience */}

          <div>

            <h2 className="text-xl font-semibold mb-4">
              Experience
            </h2>

            <textarea
              rows="5"
              name="experience"
              placeholder="Describe your volunteering or professional experience..."
              value={formData.experience}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-4 rounded-lg text-lg font-semibold transition"
          >
            {loading
              ? "Please Wait..."
              : editMode
              ? "Update Profile"
              : "Submit Application"}
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}