import { useState, useEffect } from "react";
import toolsApi from "../api/toolsApi";

const allUnits = [
  "pa",
  "kpa",
  "bar",
  "atm",
  "torr",
  "mtorr",
  "mbar",
  "inhg_abs",
  "psi_abs",
  "inh2o",
  "mmws",
  "mws",
  "psig",
  "inhg_g",
];

const unitLabels = {
  pa: "Pascal (Pa)",
  kpa: "Kilopascal (kPa)",
  bar: "Bar",
  atm: "Atmosphere (atm)",
  torr: "Torr",
  mtorr: "Millitorr",
  mbar: "Millibar",
  inhg_abs: "Inches of Mercury (abs)",
  psi_abs: "PSI (abs)",
  inh2o: "Inches of Water",
  mmws: "mm Water Column",
  mws: "Meter Water Column",
  psig: "PSI (gauge)",
  inhg_g: "Inches of Mercury (gauge)",
};

const unitCategories = {
  metric: ["pa", "kpa", "bar", "mbar"],
  imperial: ["psi_abs", "psig", "inhg_abs", "inhg_g", "inh2o"],
  scientific: ["torr", "mtorr", "atm"],
  water: ["mmws", "mws"],
};

export const useVacuumConverter = () => {
  const [inputValue, setInputValue] = useState(1);
  const [inputUnit, setInputUnit] = useState("atm");
  const [outputUnit, setOutputUnit] = useState("all");
  const [conversionData, setConversionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConversion = async () => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        value: inputValue,
        unit: inputUnit,
        to_unit: outputUnit,
      };
      const response = await toolsApi.getVacuumConversion(payload);
      setConversionData(response);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch conversion data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversion();
  }, [inputValue, inputUnit, outputUnit]);

  const getResults = () => {
    if (!conversionData) return [];

    if (conversionData.conversions) {
      return Object.entries(conversionData.conversions).map(
        ([unit, value]) => ({
          unit,
          value,
        })
      );
    }

    if (
      conversionData.converted_value !== undefined &&
      conversionData.output_unit
    ) {
      return [
        {
          unit: conversionData.output_unit,
          value: conversionData.converted_value,
        },
      ];
    }

    return [];
  };

  const results = getResults();

  const formatValue = (value) => {
    if (value === 0) return "0";
    if (Math.abs(value) < 0.0001) return value.toExponential(4);
    if (Math.abs(value) < 0.01) return value.toFixed(6);
    if (Math.abs(value) < 1) return value.toFixed(4);
    if (Math.abs(value) < 1000) return value.toFixed(2);
    return value.toFixed(0);
  };

  return {
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
  };
};
