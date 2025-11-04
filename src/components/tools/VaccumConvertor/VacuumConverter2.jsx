import React from "react";
// import { useVacuumConverter } from "../../hooks/useVacuumConverter";
import {
  getVacuumUnitIcon,
  FiActivity,
  FiBarChart2,
  FiWind,
  FiDroplet,
  FiRefreshCw,
  FiArrowRight,
} from "../../../utils/vacuumIcons";
import { useVacuumConverter } from "../../../hooks/useVacuumConverter";
import { Wind } from "lucide-react";

const VacuumConverter2 = () => {
  const {
    // State
    inputValue,
    inputUnit,
    outputUnit,
    loading,
    error,
    results,
    allUnits,
    unitLabels,
    unitCategories,

    // Actions
    setInputValue,
    setInputUnit,
    setOutputUnit,
    fetchConversion,

    // Helper functions
    formatValue,
  } = useVacuumConverter();

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-600 rounded-xl flex items-center justify-center shadow-sm mx-auto mb-4 sm:mb-6">
            {/* <FiActivity className="w-8 h-8 sm:w-10 sm:h-10 text-white" /> */}
            <Wind className="w-8 h-8 sm:w-10 sm:h-10 text-white" size={24} />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Vacuum Unit Converter
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Convert between different vacuum and pressure units with precision
            for scientific and engineering applications.
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Value Input */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                className="w-full p-3 sm:p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                placeholder="Enter value"
              />
            </div>

            {/* From Unit */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Unit
              </label>
              <div className="relative">
                <select
                  value={inputUnit}
                  onChange={(e) => setInputUnit(e.target.value)}
                  className="w-full p-3 sm:p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white transition-colors duration-200 pr-12"
                >
                  {allUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unitLabels[unit]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {getVacuumUnitIcon(inputUnit)}
                </div>
              </div>
            </div>

            {/* To Unit */}
            <div className="lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Unit
              </label>
              <div className="relative">
                <select
                  value={outputUnit}
                  onChange={(e) => setOutputUnit(e.target.value)}
                  className="w-full p-3 sm:p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none bg-white transition-colors duration-200 pr-12"
                >
                  <option value="all">All Units</option>
                  {allUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unitLabels[unit]}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FiArrowRight className="text-gray-400" size={18} />
                </div>
              </div>
            </div>

            {/* Refresh Button */}
            <div className="lg:col-span-1 flex items-end">
              <button
                onClick={fetchConversion}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <FiRefreshCw className="animate-spin" size={18} />
                ) : (
                  <FiRefreshCw size={18} />
                )}
                <span className="text-sm sm:text-base">
                  {loading ? "Converting..." : "Refresh"}
                </span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center font-medium text-sm sm:text-base">
                {error}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">
                  Converting vacuum units...
                </p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {results.length > 0 && !loading && (
            <div className="mt-6 sm:mt-8">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  Conversion Results
                </h3>
                <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                  {results.length} {results.length === 1 ? "unit" : "units"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {results.map(({ unit, value }) => (
                  <div
                    key={unit}
                    className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200 group"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                        <div className="w-5 h-5">{getVacuumUnitIcon(unit)}</div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-gray-900 text-lg sm:text-xl truncate">
                          {formatValue(value)}
                        </div>
                        <div className="text-xs text-gray-500 uppercase font-mono mt-1">
                          {unit}
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-700 font-medium mb-2">
                      {unitLabels[unit]}
                    </div>

                    {inputUnit !== unit && (
                      <div className="pt-3 border-t border-gray-100">
                        <div className="text-xs text-gray-600">
                          1 {inputUnit.toUpperCase()} ={" "}
                          {(value / inputValue).toFixed(6)} {unit.toUpperCase()}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary Footer */}
              <div className="bg-purple-50 rounded-xl p-4 sm:p-6 border border-purple-100 mt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-2 sm:space-y-0">
                  <div>
                    <div className="text-purple-800 font-semibold text-lg mb-1">
                      Conversion Complete
                    </div>
                    <div className="text-purple-600 text-sm">
                      All {results.length} vacuum conversions calculated
                      successfully
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-purple-700 font-medium bg-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>REAL-TIME ACCURACY</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center">
            About Vacuum Units
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 text-sm text-gray-600">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FiWind className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Absolute Pressure
              </h4>
              <p className="text-xs sm:text-sm">
                Measured relative to perfect vacuum (zero pressure)
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FiBarChart2 className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Gauge Pressure
              </h4>
              <p className="text-xs sm:text-sm">
                Measured relative to atmospheric pressure
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FiDroplet className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                Differential Pressure
              </h4>
              <p className="text-xs sm:text-sm">
                Difference between two pressure points
              </p>
            </div>
          </div>
        </div>

        {/* Unit Categories */}
        <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-center text-white mb-6 sm:mb-8">
            Unit Categories
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Object.entries(unitCategories).map(([category, units]) => (
              <div
                key={category}
                className="bg-gray-700/50 rounded-lg p-4 sm:p-6 border border-gray-600"
              >
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 capitalize text-center">
                  {category} Units
                </h4>
                <div className="space-y-2 sm:space-y-3">
                  {units.map((unit) => (
                    <div
                      key={unit}
                      className="flex items-center space-x-2 text-gray-300 text-xs sm:text-sm p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                    >
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        {getVacuumUnitIcon(unit)}
                      </div>
                      <span className="truncate flex-1">
                        {unitLabels[unit]}
                      </span>
                      <span className="text-gray-500 text-xs font-mono flex-shrink-0">
                        {unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacuumConverter2;
