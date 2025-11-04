import React from "react";
import { FiArrowRight, FiRefreshCw, FiActivity } from "react-icons/fi";
import { usePressureConverter } from "../../../hooks/usePressureConverter";
import { getUnitIcon } from "../../../utils/unitIcons";
// import PressureIcon from "../assets/pressure.png";
import PressureIcon from "../../../assets/pressure.png";

const PressureConverter2 = () => {
  const {
    // State
    inputValue,
    fromUnit,
    toUnit,
    loading,
    error,
    results,
    dropdownUnits,
    unitCategories,
    allUnits,

    // Actions
    setInputValue,
    setFromUnit,
    setToUnit,
    handleSwap,
    resetConverter,

    // Helper functions
    formatValue,
    getUnitDisplayName,
  } = usePressureConverter();

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm mx-auto mb-4 sm:mb-6">
            {/* <FiActivity className="w-8 h-8 sm:w-10 sm:h-10 text-white" /> */}
            <img
              src={PressureIcon}
              alt="pressure"
              className="w-8 h-8 sm:w-10 sm:h-10 invert"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Pressure Unit Converterss
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
            Convert between {allUnits.length}+ pressure units with meaningful
            icons for each unit type.
          </p>
        </div>

        {/* Main Converter Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          {/* Input Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Value Input */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
                className="w-full p-3 sm:p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter value"
              />
            </div>

            {/* From Unit */}
            <div className="lg:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Unit
              </label>
              <div className="relative">
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full p-3 sm:p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors duration-200 pr-12"
                >
                  {dropdownUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {getUnitDisplayName(unit)} ({unit.toUpperCase()})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  {getUnitIcon(fromUnit)}
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="lg:col-span-1 flex justify-center items-center py-2">
              <button
                onClick={handleSwap}
                disabled={toUnit === "all"}
                className="p-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                title="Swap units"
              >
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>

            {/* To Unit */}
            <div className="lg:col-span-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Convert To
              </label>
              <div className="relative">
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full p-3 sm:p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors duration-200 pr-12"
                >
                  <option value="all">All Units</option>
                  {dropdownUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {getUnitDisplayName(unit)} ({unit.toUpperCase()})
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <FiArrowRight className="text-gray-400" size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons & Status */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  loading ? "bg-yellow-500 animate-pulse" : "bg-green-500"
                }`}
              />
              <span className="text-gray-600">
                {loading ? "Converting..." : error ? "Error" : "Ready"}
              </span>
            </div>

            <button
              onClick={resetConverter}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 active:scale-95 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md group"
            >
              <FiRefreshCw
                size={16}
                className="group-active:rotate-180 transition-transform duration-300"
              />
              <span>Reset Converter</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center font-medium text-sm">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">
                Converting pressure units...
              </p>
            </div>
          </div>
        )}

        {/* Results Section */}
        {results.length > 0 && !loading && (
          <div className="space-y-6 sm:space-y-8">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                  Conversion Results
                </h2>
                <p className="text-gray-600 text-sm">
                  {inputValue} {getUnitDisplayName(fromUnit)} → {results.length}{" "}
                  {results.length === 1 ? "unit" : "units"}
                </p>
              </div>
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {results.length} {results.length === 1 ? "RESULT" : "RESULTS"}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
              {results.map(({ unit, value }) => (
                <div
                  key={unit}
                  className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-200 group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                      <div className="w-5 h-5">{getUnitIcon(unit)}</div>
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
                    {getUnitDisplayName(unit)}
                  </div>

                  {fromUnit !== unit && (
                    <div className="pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-600">
                        1 {fromUnit.toUpperCase()} ={" "}
                        {(value / inputValue).toFixed(6)} {unit.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Summary Footer */}
            <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-100">
              <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-2 sm:space-y-0">
                <div>
                  <div className="text-blue-800 font-semibold text-lg mb-1">
                    Conversion Complete
                  </div>
                  <div className="text-blue-600 text-sm">
                    All {results.length} pressure conversions calculated with
                    meaningful unit icons
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-blue-700 font-medium bg-white px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>FEATHER ICONS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unit Categories */}
        <div className="mt-8 sm:mt-12 bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-center text-white mb-6 sm:mb-8">
            Unit Categories ({allUnits.length}+ Units)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Object.entries(unitCategories).map(([category, units]) => (
              <div
                key={category}
                className="bg-gray-700/50 rounded-lg p-4 sm:p-6 border border-gray-600"
              >
                <h4 className="text-base font-semibold text-white mb-3 sm:mb-4 text-center">
                  {category} ({units.length})
                </h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {units.map((unit) => (
                    <div
                      key={unit}
                      className="flex items-center space-x-2 text-gray-300 text-sm p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                    >
                      <div className="w-4 h-4 flex items-center justify-center flex-shrink-0">
                        {getUnitIcon(unit)}
                      </div>
                      <span className="truncate flex-1">
                        {getUnitDisplayName(unit)}
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

export default PressureConverter2;
