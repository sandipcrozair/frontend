import React from "react";
import { Thermometer, Gauge, Zap, Eraser } from "lucide-react";
// import BoilIcon from "../../assets/boil.png";
import BoilIcon from "../../../assets/boil.png";
import { useBoilingPointCalculator } from "../../../hooks/useBoilingPointCalculator";
import { BoilingPointHeader } from "./BoilingPointHeader";
import { SubstanceSelector } from "./SubstanceSelector";
import { InputCard } from "./InputCard";
import { ResultsDisplay } from "./ResultsDisplay";

export default function BoilingPointCalculator() {
  const {
    // State
    selectedSubstance,
    inputs,
    result,
    loading,
    error,
    isSubstanceOpen,
    groupedSubstances,
    selectedSubstanceData,

    // Functions
    handleSubstanceChange,
    handleInputChange,
    handleInputFocus,
    clearAll,
    toggleSubstanceDropdown,
    validationErrors,
  } = useBoilingPointCalculator();

  // Input field configurations
  const knownValuesFields = [
    {
      field: "P1",
      label: "Pressure (P₁)",
      unit: "Torr",
      icon: Gauge,
      iconColor: "text-orange-500",
    },
    {
      field: "T1",
      label: "Temperature (T₁)",
      unit: "°C",
      icon: Thermometer,
      iconColor: "text-orange-500",
    },
    {
      field: "Hvap",
      label: "Enthalpy of Vaporization (ΔHvap)",
      unit: "kJ/mol",
      icon: Zap,
      iconColor: "text-orange-500",
    },
  ];

  const targetValuesFields = [
    {
      field: "P2",
      label: "Target Pressure (P₂)",
      unit: "Torr",
      icon: Gauge,
      iconColor: "text-red-500",
    },
    {
      field: "T2",
      label: "Target Temperature (T₂)",
      unit: "°C",
      icon: Thermometer,
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-orange-50/50 via-red-50/30 to-amber-50/20 border border-white/50 overflow-hidden backdrop-blur-sm mx-auto py-4 sm:py-6 lg:py-8 px-3 sm:px-2 lg:px-4 xl:px-6">
      {/* Header */}
      <BoilingPointHeader BoilIcon={BoilIcon} />

      <div className="p-2 sm:p-3 lg:p-4">
        {/* Substance Selection */}
        <SubstanceSelector
          selectedSubstance={selectedSubstance}
          selectedSubstanceData={selectedSubstanceData}
          isSubstanceOpen={isSubstanceOpen}
          groupedSubstances={groupedSubstances}
          onSubstanceChange={handleSubstanceChange}
          onToggleDropdown={toggleSubstanceDropdown}
          validationErrors={validationErrors}
        />

        {/* Input Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Known Values Card */}
          <InputCard
            title="Known Values"
            subtitle="Reference boiling point data"
            icon={Thermometer}
            gradient="bg-gradient-to-r from-orange-500 to-red-500"
            fields={knownValuesFields}
            inputs={inputs}
            onInputChange={handleInputChange}
            onInputFocus={handleInputFocus}
            validationErrors={validationErrors}
            focusColor="focus:ring-orange-500"
          />

          <InputCard
            title="Find Unknown"
            subtitle="Enter one value to calculate the other"
            icon={Gauge}
            gradient="bg-gradient-to-r from-red-500 to-pink-500"
            fields={targetValuesFields}
            inputs={inputs}
            onInputChange={handleInputChange}
            onInputFocus={handleInputFocus}
            validationErrors={validationErrors}
            focusColor="focus:ring-red-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mb-6 sm:mb-8">
          <button
            onClick={clearAll}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 sm:py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-orange-500/30 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group relative overflow-hidden"
          >
            {/* Animated background shine */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            <Eraser className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-lg sm:text-xl relative z-10 font-semibold">
              Clear All
            </span>
          </button>
        </div>

        {/* Results Section */}
        <ResultsDisplay loading={loading} result={result} error={error} />
      </div>
    </div>
  );
}
