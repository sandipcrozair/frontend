import React from "react";

const DataCard = ({ label, value, icon: Icon, unit, index }) => {
  return (
    <div
      className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200 group p-4 sm:p-6 lg:p-6"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* <div className="flex items-center justify-center mb-3 sm:mb-4 lg:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
            <Icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600" />
          </div>
          <span className="text-xs sm:text-sm lg:text-sm font-medium text-gray-600 uppercase tracking-wide whitespace-nowrap">
            {label}
          </span>
        </div>
      </div> */}
      <div className="flex items-center justify-center flex-col">
        <Icon className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-blue-600" />
        <span className="text-xs sm:text-sm lg:text-sm font-medium text-gray-600 uppercase tracking-wide whitespace-nowrap">
          {label}
        </span>
      </div>

      <div className="flex justify-center items-baseline space-x-1 sm:space-x-2">
        <p className="text-lg sm:text-xl lg:text-2xl xl:text-2xl font-bold text-gray-900 truncate">
          {typeof value === "number" ? value.toFixed(2) : value}
        </p>
        {unit && (
          <span className="text-xs sm:text-sm lg:text-sm text-gray-500 font-medium whitespace-nowrap">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default DataCard;
