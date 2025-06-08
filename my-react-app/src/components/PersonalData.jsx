import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PersonalData = () => {
  const [step, setStep] = useState(1);
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessName: "",
    industry: "",
    companySize: "",
    theme: "",
    layout: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required.";
      } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
        newErrors.name = "Only letters and spaces allowed";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
      }
    }

    if (step === 2) {
      if (!formData.businessName.trim())
        newErrors.businessName = "Business name is required";
      if (!formData.industry) newErrors.industry = "Please select an industry";
      if (!formData.companySize)
        newErrors.companySize = "Please select company size";
    }

    if (step === 3) {
      if (!formData.theme) newErrors.theme = "Select a theme.";
      if (!formData.layout) newErrors.layout = "Select a layout.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const submitForm = () => {
    if (!validateStep()) return;
    navigator("/Summary", { state: formData });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-6 transition-all duration-500 bg-white shadow-xl rounded-2xl">
        <div className="text-center">
          <h1 className="mb-2 text-3xl font-bold text-blue-600">
            Onboarding Wizard
          </h1>
          <p className="text-gray-600">Step {step} of 3</p>
        </div>

        {step === 1 && (
          <>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Personal Information
            </h2>
            <div className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                maxLength={40}
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}

              <input
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={nextStep}
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Business Information
            </h2>
            <div className="space-y-4">
              <input
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.businessName && (
                <p className="text-sm text-red-500">{errors.businessName}</p>
              )}

              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Industry</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Travel & Tourism">Travel & Tourism</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Other">Other</option>
              </select>
              {errors.industry && (
                <p className="text-sm text-red-500">{errors.industry}</p>
              )}

              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Company Size</option>
                <option value="1-10">1–10 Employees</option>
                <option value="11-50">11–50 Employees</option>
                <option value="51-100">51–100 Employees</option>
                <option value="101-200">101–200 Employees</option>
                <option value="201-500">201–500 Employees</option>
                <option value="500+">500+ Employees</option>
              </select>
              {errors.companySize && (
                <p className="text-sm text-red-500">{errors.companySize}</p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-6 py-2 text-white bg-gray-400 rounded hover:bg-gray-600"
              >
                ← Back
              </button>
              <button
                onClick={nextStep}
                className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Preferences
            </h2>
            <div className="space-y-6">
              <div>
                <label className="font-medium text-gray-700">Theme</label>
                <div className="flex gap-6 mt-2">
                  {["Light", "Dark"].map((theme) => (
                    <label key={theme} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="theme"
                        value={theme}
                        checked={formData.theme === theme}
                        onChange={handleChange}
                      />
                      <span>{theme}</span>
                    </label>
                  ))}
                </div>
                {errors.theme && (
                  <p className="text-sm text-red-500">{errors.theme}</p>
                )}
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  Dashboard Layout
                </label>
                <div className="flex gap-6 mt-2">
                  {["Grid", "List"].map((layout) => (
                    <label key={layout} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="layout"
                        value={layout}
                        checked={formData.layout === layout}
                        onChange={handleChange}
                      />
                      <span>{layout}</span>
                    </label>
                  ))}
                </div>
                {errors.layout && (
                  <p className="text-sm text-red-500">{errors.layout}</p>
                )}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-6 py-2 text-white bg-gray-400 rounded hover:bg-gray-600"
              >
                ← Back
              </button>
              <button
                onClick={submitForm}
                className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PersonalData;
