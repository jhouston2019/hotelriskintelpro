import { useState } from "react";

export default function BasicHotelProfile({ data, onNext, onBack, isFirstStep }) {
  const [formData, setFormData] = useState({
    hotelName: data?.hotelName || "",
    address: data?.address || "",
    city: data?.city || "",
    state: data?.state || "",
    zip: data?.zip || "",
    numberOfRooms: data?.numberOfRooms || "",
    squareFootage: data?.squareFootage || "",
    yearBuilt: data?.yearBuilt || "",
    yearRenovated: data?.yearRenovated || "",
    numberOfFloors: data?.numberOfFloors || "",
    constructionType: data?.constructionType || "",
    roofType: data?.roofType || "",
    roofAge: data?.roofAge || "",
    sprinklerSystem: data?.sprinklerSystem || "",
    fireAlarmSystem: data?.fireAlarmSystem || "",
    poolSpa: data?.poolSpa || "",
    restaurantBar: data?.restaurantBar || "",
    eventSpace: data?.eventSpace || "",
    parkingStructure: data?.parkingStructure || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tell Us About Your Hotel</h2>
          <p className="mt-2 text-base text-gray-600">
            Basic property information helps us understand your hotel's physical risk profile.
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Hotel Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.hotelName}
              onChange={(e) => handleChange("hotelName", e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              placeholder="e.g., Riverside Inn"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Number of Rooms <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              required
              value={formData.numberOfRooms}
              onChange={(e) => handleChange("numberOfRooms", e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              placeholder="e.g., 85"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Property Address <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
            placeholder="Street address"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              City <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              State <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              placeholder="e.g., CA"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              ZIP Code <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Property Details</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Square Footage <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                required
                value={formData.squareFootage}
                onChange={(e) => handleChange("squareFootage", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                placeholder="Total building square feet"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Number of Floors <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                required
                value={formData.numberOfFloors}
                onChange={(e) => handleChange("numberOfFloors", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Year Built <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                required
                value={formData.yearBuilt}
                onChange={(e) => handleChange("yearBuilt", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                placeholder="e.g., 1995"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Year Renovated <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <input
                type="number"
                value={formData.yearRenovated}
                onChange={(e) => handleChange("yearRenovated", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                placeholder="e.g., 2018"
              />
            </div>
          </div>
        </div>

        {/* Building Construction */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Building Construction</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Construction Type <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.constructionType}
                onChange={(e) => handleChange("constructionType", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="masonry">Masonry</option>
                <option value="frame">Frame</option>
                <option value="concrete">Concrete</option>
                <option value="steel">Steel</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Roof Type <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.roofType}
                onChange={(e) => handleChange("roofType", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="flat">Flat</option>
                <option value="pitched">Pitched</option>
                <option value="metal">Metal</option>
                <option value="tile">Tile</option>
                <option value="membrane">Membrane</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Roof Age (years) <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                required
                value={formData.roofAge}
                onChange={(e) => handleChange("roofAge", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                placeholder="e.g., 8"
              />
            </div>
          </div>
        </div>

        {/* Safety Systems */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Safety Systems</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Sprinkler System <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.sprinklerSystem}
                onChange={(e) => handleChange("sprinklerSystem", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="yes">Yes - Full coverage</option>
                <option value="partial">Partial coverage</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Fire Alarm System <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.fireAlarmSystem}
                onChange={(e) => handleChange("fireAlarmSystem", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Amenities & Features */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Amenities & Features</h3>
          <p className="text-sm text-gray-600 mb-6">
            These affect liability exposure and business interruption complexity
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-5 cursor-pointer hover:border-hrip-navy hover:bg-blue-50 transition-all">
              <input
                type="checkbox"
                checked={formData.poolSpa === "yes"}
                onChange={(e) => handleChange("poolSpa", e.target.checked ? "yes" : "no")}
                className="h-5 w-5 rounded border-gray-300 text-hrip-navy focus:ring-hrip-navy"
              />
              <span className="text-base font-medium text-gray-900">Pool / Spa</span>
            </label>
            <label className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-5 cursor-pointer hover:border-hrip-navy hover:bg-blue-50 transition-all">
              <input
                type="checkbox"
                checked={formData.restaurantBar === "yes"}
                onChange={(e) => handleChange("restaurantBar", e.target.checked ? "yes" : "no")}
                className="h-5 w-5 rounded border-gray-300 text-hrip-navy focus:ring-hrip-navy"
              />
              <span className="text-base font-medium text-gray-900">Restaurant / Bar</span>
            </label>
            <label className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-5 cursor-pointer hover:border-hrip-navy hover:bg-blue-50 transition-all">
              <input
                type="checkbox"
                checked={formData.eventSpace === "yes"}
                onChange={(e) => handleChange("eventSpace", e.target.checked ? "yes" : "no")}
                className="h-5 w-5 rounded border-gray-300 text-hrip-navy focus:ring-hrip-navy"
              />
              <span className="text-base font-medium text-gray-900">Event / Conference Space</span>
            </label>
            <label className="flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-50 p-5 cursor-pointer hover:border-hrip-navy hover:bg-blue-50 transition-all">
              <input
                type="checkbox"
                checked={formData.parkingStructure === "yes"}
                onChange={(e) => handleChange("parkingStructure", e.target.checked ? "yes" : "no")}
                className="h-5 w-5 rounded border-gray-300 text-hrip-navy focus:ring-hrip-navy"
              />
              <span className="text-base font-medium text-gray-900">Parking Structure / Valet</span>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between pt-8 border-t-2 border-gray-200">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirstStep}
          className="inline-flex items-center gap-2 text-base font-semibold text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-hrip-navy px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-800 transition-all hover:shadow-xl"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
