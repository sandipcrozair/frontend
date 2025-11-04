import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationSummary = ({ data }) => {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mx-2 sm:mx-0">
      <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-gray-900 mb-4 sm:mb-5 lg:mb-6 flex items-center">
        <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3" />
        Location Summary
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-3 sm:mb-4">
            Coordinates
          </h4>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
              <span className="text-gray-600 text-sm sm:text-base">
                Latitude
              </span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {data.latitude.toFixed(6)}°
              </span>
            </div>
            <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
              <span className="text-gray-600 text-sm sm:text-base">
                Longitude
              </span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {data.longitude.toFixed(6)}°
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-3 sm:mb-4">
            Altimeter Data
          </h4>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
              <span className="text-gray-600 text-sm sm:text-base">
                Above Sea Level
              </span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base text-right">
                {data.elevation_m}m<br className="sm:hidden" />
                <span className="text-gray-400 mx-1 hidden sm:inline">/</span>
                {data.elevation_ft}ft
              </span>
            </div>
            <div className="flex justify-between items-center py-2 sm:py-3 border-b border-gray-100">
              <span className="text-gray-600 text-sm sm:text-base">
                Atmospheric Pressure
              </span>
              <span className="font-semibold text-gray-900 text-sm sm:text-base">
                {data.pressure_pa} Pa
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSummary;
