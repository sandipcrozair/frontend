import { useState, useEffect } from "react";
import toolsApi from "../api/toolsApi";

const allUnits = [
  "pa",
  "pascal",
  "kilopascal",
  "kpa",
  "bar",
  "psi",
  "ksi",
  "atm",
  "epa",
  "ppa",
  "tpa",
  "gpa",
  "mpa",
  "hpa",
  "dapa",
  "dpa",
  "cpa",
  "mpa_small",
  "µpa",
  "npa",
  "ppa_small",
  "fpa",
  "apa",
  "newton_per_m2",
  "newton_per_cm2",
  "newton_per_mm2",
  "kilonewton_per_m2",
  "millibar",
  "mbar",
  "microbar",
  "dyne_per_cm2",
  "kgf_per_m2",
  "kgf_per_cm2",
  "kgf_per_mm2",
  "gf_per_cm2",
  "ton_short_per_sqft",
  "ton_short_per_sqin",
  "ton_long_per_sqft",
  "ton_long_per_sqin",
  "kip_per_sqin",
  "psf",
  "psi_small",
  "poundal_per_sqft",
  "torr",
  "cmhg",
  "mmhg",
  "inhg",
  "cmh2o",
  "mmh2o",
  "inhaq",
  "ftaq",
  "at",
];

const getUnitDisplayName = (unit) => {
  const unitNames = {
    pa: "Pascal",
    pascal: "Pascal",
    kilopascal: "Kilopascal",
    kpa: "Kilopascal",
    bar: "Bar",
    psi: "PSI",
    ksi: "KSI",
    atm: "Atmosphere",
    epa: "Exapascal",
    ppa: "Petapascal",
    tpa: "Terapascal",
    gpa: "Gigapascal",
    mpa: "Megapascal",
    hpa: "Hectopascal",
    dapa: "Decapascal",
    dpa: "Decipascal",
    cpa: "Centipascal",
    mpa_small: "Millipascal",
    µpa: "Micropascal",
    npa: "Nanopascal",
    ppa_small: "Picopascal",
    fpa: "Femtopascal",
    apa: "Attopascal",
    newton_per_m2: "Newton per m²",
    newton_per_cm2: "Newton per cm²",
    newton_per_mm2: "Newton per mm²",
    kilonewton_per_m2: "Kilonewton per m²",
    millibar: "Millibar",
    mbar: "Millibar",
    microbar: "Microbar",
    dyne_per_cm2: "Dyne per cm²",
    kgf_per_m2: "kgf per m²",
    kgf_per_cm2: "kgf per cm²",
    kgf_per_mm2: "kgf per mm²",
    gf_per_cm2: "Gram-force per cm²",
    ton_short_per_sqft: "Ton Short per sq ft",
    ton_short_per_sqin: "Ton Short per sq in",
    ton_long_per_sqft: "Ton Long per sq ft",
    ton_long_per_sqin: "Ton Long per sq in",
    kip_per_sqin: "Kip per sq in",
    psf: "Pound per sq ft",
    psi_small: "PSI (Small)",
    poundal_per_sqft: "Poundal per sq ft",
    torr: "Torr",
    cmhg: "cm Mercury",
    mmhg: "mm Mercury",
    inhg: "Inch Mercury",
    cmh2o: "cm Water",
    mmh2o: "mm Water",
    inhaq: "Inch Water",
    ftaq: "Foot Water",
    at: "Technical Atmosphere",
  };
  return unitNames[unit] || unit.replace(/_/g, " ").toUpperCase();
};

const unitCategories = {
  "SI Units": [
    "pa",
    "pascal",
    "kilopascal",
    "kpa",
    "mpa",
    "gpa",
    "hpa",
    "epa",
    "ppa",
    "tpa",
    "dapa",
    "dpa",
    "cpa",
  ],
  "Scientific Notation": ["mpa_small", "µpa", "npa", "ppa_small", "fpa", "apa"],
  "Metric Units": ["bar", "millibar", "mbar", "microbar", "at"],
  "Imperial Pressure": ["psi", "ksi", "psf", "kip_per_sqin", "psi_small"],
  "Weight-based Imperial": [
    "ton_short_per_sqft",
    "ton_short_per_sqin",
    "ton_long_per_sqft",
    "ton_long_per_sqin",
  ],
  "Force-based Units": [
    "newton_per_m2",
    "newton_per_cm2",
    "newton_per_mm2",
    "kilonewton_per_m2",
    "dyne_per_cm2",
  ],
  "Mass-force Units": [
    "kgf_per_m2",
    "kgf_per_cm2",
    "kgf_per_mm2",
    "gf_per_cm2",
    "poundal_per_sqft",
  ],
  "Mercury Units": ["torr", "cmhg", "mmhg", "inhg"],
  "Water Column Units": ["cmh2o", "mmh2o", "inhaq", "ftaq"],
  Atmosphere: ["atm"],
};

export const usePressureConverter = () => {
  const [inputValue, setInputValue] = useState(101325);
  const [fromUnit, setFromUnit] = useState("pa");
  const [toUnit, setToUnit] = useState("all");
  const [conversionData, setConversionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversion = async () => {
      try {
        setLoading(true);
        setError(null);
        const payload = {
          value: inputValue,
          from_unit: fromUnit,
          to_unit: toUnit,
        };
        const response = await toolsApi.getPressureConversion(payload);
        setConversionData(response);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch conversion data.");
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(inputValue) && fromUnit) {
      const timer = setTimeout(fetchConversion, 300);
      return () => clearTimeout(timer);
    }
  }, [inputValue, fromUnit, toUnit]);

  const getResults = () => {
    if (!conversionData) return [];

    if (conversionData.conversions) {
      return Object.entries(conversionData.conversions).map(
        ([unit, value]) => ({ unit, value })
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

  const handleSwap = () => {
    if (toUnit === "all") return;
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const resetConverter = () => {
    setInputValue(101325);
    setFromUnit("pa");
    setToUnit("all");
  };

  const formatValue = (value) => {
    if (value === 0) return "0";
    if (Math.abs(value) < 0.0001) return value.toExponential(4);
    if (Math.abs(value) >= 1000000) return value.toExponential(4);

    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  const getUniqueUnitsForDropdown = () => {
    const uniqueUnits = [];
    const seenNames = new Set();

    allUnits.forEach((unit) => {
      const displayName = getUnitDisplayName(unit);
      if (!seenNames.has(displayName)) {
        seenNames.add(displayName);
        uniqueUnits.push(unit);
      }
    });

    return uniqueUnits;
  };

  const dropdownUnits = getUniqueUnitsForDropdown();

  return {
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
  };
};
