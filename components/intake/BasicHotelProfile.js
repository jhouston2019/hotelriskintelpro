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
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-800 bg-slate-950/80 p-8">
      <h2 className="text-2xl font-semibold text-slate-100">Tell Us About Your Hotel</h2>
      <p className="mt-2 text-sm text-slate-400">
        Basic property information helps us understand your hotel&apos;s physical risk profile.
      </p>

      {/* Basic Information */}
      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Hotel Name
            </label>
            <input
              type="text"
              required
              value={formData.hotelName}
              onChange={(e) => handleChange("hotelName", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              placeholder="e.g., Riverside Inn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Number of Rooms
            </label>
            <input
              type="number"
              required
              value={formData.numberOfRooms}
              onChange={(e) => handleChange("numberOfRooms", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              placeholder="e.g., 85"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Property Address
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => handleChange("address", e.target.value)}
            className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
            placeholder="Street address"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-300">City</label>
            <input
              type="text"
              required
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">State</label>
            <input
              type="text"
              required
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              placeholder="e.g., CA"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">ZIP Code</label>
            <input
              type="text"
              required
              value={formData.zip}
              onChange={(e) => handleChange("zip", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Property Details</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Square Footage
              </label>
              <input
                type="number"
                required
                value={formData.squareFootage}
                onChange={(e) => handleChange("squareFootage", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                placeholder="Total building square feet"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Number of Floors
              </label>
              <input
                type="number"
                required
                value={formData.numberOfFloors}
                onChange={(e) => handleChange("numberOfFloors", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Year Built
              </label>
              <input
                type="number"
                required
                value={formData.yearBuilt}
                onChange={(e) => handleChange("yearBuilt", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                placeholder="e.g., 1995"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Year Renovated <span className="text-slate-500">(optional)</span>
              </label>
              <input
                type="number"
                value={formData.yearRenovated}
                onChange={(e) => handleChange("yearRenovated", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                placeholder="e.g., 2018"
              />
            </div>
          </div>
        </div>

        {/* Building Construction */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Building Construction</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Construction Type
              </label>
              <select
                required
                value={formData.constructionType}
                onChange={(e) => handleChange("constructionType", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
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
              <label className="block text-sm font-medium text-slate-300">
                Roof Type
              </label>
              <select
                required
                value={formData.roofType}
                onChange={(e) => handleChange("roofType", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
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
              <label className="block text-sm font-medium text-slate-300">
                Roof Age (years)
              </label>
              <input
                type="number"
                required
                value={formData.roofAge}
                onChange={(e) => handleChange("roofAge", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                placeholder="e.g., 8"
              />
            </div>
          </div>
        </div>

        {/* Safety Systems */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Safety Systems</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Sprinkler System
              </label>
              <select
                required
                value={formData.sprinklerSystem}
                onChange={(e) => handleChange("sprinklerSystem", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              >
                <option value="">Select...</option>
                <option value="yes">Yes - Full coverage</option>
                <option value="partial">Partial coverage</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Fire Alarm System
              </label>
              <select
                required
                value={formData.fireAlarmSystem}
                onChange={(e) => handleChange("fireAlarmSystem", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Amenities & Features */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Amenities & Features</h3>
          <p className="mt-1 text-xs text-slate-400">
            These affect liability exposure and business interruption complexity
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={formData.poolSpa === "yes"}
                onChange={(e) => handleChange("poolSpa", e.target.checked ? "yes" : "no")}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-hrip-gold focus:ring-hrip-gold focus:ring-offset-slate-950"
              />
              <span className="text-sm text-slate-300">Pool / Spa</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={formData.restaurantBar === "yes"}
                onChange={(e) => handleChange("restaurantBar", e.target.checked ? "yes" : "no")}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-hrip-gold focus:ring-hrip-gold focus:ring-offset-slate-950"
              />
              <span className="text-sm text-slate-300">Restaurant / Bar</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={formData.eventSpace === "yes"}
                onChange={(e) => handleChange("eventSpace", e.target.checked ? "yes" : "no")}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-hrip-gold focus:ring-hrip-gold focus:ring-offset-slate-950"
              />
              <span className="text-sm text-slate-300">Event / Conference Space</span>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4 cursor-pointer hover:border-slate-700">
              <input
                type="checkbox"
                checked={formData.parkingStructure === "yes"}
                onChange={(e) => handleChange("parkingStructure", e.target.checked ? "yes" : "no")}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-hrip-gold focus:ring-hrip-gold focus:ring-offset-slate-950"
              />
              <span className="text-sm text-slate-300">Parking Structure / Valet</span>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          disabled={isFirstStep}
          className="text-sm text-slate-400 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="rounded-md bg-hrip-gold px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
