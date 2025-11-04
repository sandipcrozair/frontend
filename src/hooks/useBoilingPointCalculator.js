import { useState, useEffect, useCallback, useRef } from "react";
import calculatorApi from "../api/calculatorApi";
import { useDebounce } from "./useDebounce";
import { substances } from "../constant/constant";
import { boilingPointSchema } from "../components/calculators/BoilingPointCalculator/validation/boilingPointSchema";

export function useBoilingPointCalculator() {
  const [selectedSubstance, setSelectedSubstance] = useState("");
  const [inputs, setInputs] = useState({
    P1: "",
    T1: "",
    Hvap: "",
    P2: "",
    T2: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubstanceOpen, setIsSubstanceOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Refs to track the source of changes
  const isProgrammaticUpdateRef = useRef(false);
  const lastUserInputFieldRef = useRef(null);
  const lastUserInputValueRef = useRef({ P2: "", T2: "" });

  // debounced values of the editable fields
  const debouncedP2 = useDebounce(inputs.P2, 600);
  const debouncedT2 = useDebounce(inputs.T2, 600);

  // Group substances by category
  const groupedSubstances = substances.reduce((acc, substance) => {
    if (!acc[substance.category]) {
      acc[substance.category] = [];
    }
    acc[substance.category].push(substance);
    return acc;
  }, {});

  const selectedSubstanceData = substances.find(
    (s) => s.name === selectedSubstance
  );

  // Real-time validation
  const validateInputs = useCallback(async (inputValues, currentSubstance) => {
    try {
      // Only validate if we have some inputs or a substance selected
      const hasInputs = Object.values(inputValues).some((val) => val !== "");
      if (!hasInputs && !currentSubstance) {
        setValidationErrors({});
        return true;
      }

      // Prepare values for validation
      const validationValues = {
        substance: currentSubstance,
        P1: inputValues.P1 === "" ? null : Number(inputValues.P1),
        T1: inputValues.T1 === "" ? null : Number(inputValues.T1),
        Hvap: inputValues.Hvap === "" ? null : Number(inputValues.Hvap),
        P2: inputValues.P2 === "" ? null : Number(inputValues.P2),
        T2: inputValues.T2 === "" ? null : Number(inputValues.T2),
      };

      await boilingPointSchema.validate(validationValues, {
        abortEarly: false,
      });
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
        return false;
      }
      return false;
    }
  }, []);

  const handleSubstanceChange = useCallback(
    (substance) => {
      const newSubstance = substance.name;
      setSelectedSubstance(newSubstance);
      setIsSubstanceOpen(false);

      if (substance) {
        isProgrammaticUpdateRef.current = true;
        const newInputs = {
          ...inputs,
          Hvap: String(substance.Hvap),
        };
        setInputs(newInputs);
        validateInputs(newInputs, newSubstance);
        setResult(null);
        setError(null);
        lastUserInputFieldRef.current = null;
        lastUserInputValueRef.current = { P2: "", T2: "" };
      }
    },
    [inputs, validateInputs]
  );

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      if (name === "P2" || name === "T2") {
        lastUserInputFieldRef.current = name;
        lastUserInputValueRef.current[name] = value;
      }

      isProgrammaticUpdateRef.current = false;
      const newInputs = { ...inputs, [name]: value };
      setInputs(newInputs);
      validateInputs(newInputs, selectedSubstance);
    },
    [inputs, selectedSubstance, validateInputs]
  );

  const fetchBoilingPoint = useCallback(
    async (payloadFieldValue, fieldName) => {
      if (!selectedSubstance) return;

      // Validate before API call
      const validationValues = {
        substance: selectedSubstance,
        P1: inputs.P1 === "" ? null : Number(inputs.P1),
        T1: inputs.T1 === "" ? null : Number(inputs.T1),
        Hvap: inputs.Hvap === "" ? null : Number(inputs.Hvap),
        P2: inputs.P2 === "" ? null : Number(inputs.P2),
        T2: inputs.T2 === "" ? null : Number(inputs.T2),
      };

      try {
        await boilingPointSchema.validate(validationValues, {
          abortEarly: false,
        });
      } catch (err) {
        // Don't proceed if validation fails
        return;
      }

      const { P1, T1, Hvap } = inputs;
      if (!P1 || !T1 || !Hvap) return;

      const payload = {
        P1: parseFloat(P1),
        T1: parseFloat(T1),
        Hvap: parseFloat(Hvap),
      };

      if (fieldName === "P2" && payloadFieldValue !== "") {
        payload.P2 = parseFloat(payloadFieldValue);
      } else if (fieldName === "T2" && payloadFieldValue !== "") {
        payload.T2 = parseFloat(payloadFieldValue);
      } else {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await calculatorApi.calculateBoilingPoint(payload);
        setResult(response || null);

        isProgrammaticUpdateRef.current = true;
        setInputs((prev) => {
          const next = { ...prev };
          if (fieldName === "P2") {
            if (response && response.T2 !== undefined)
              next.T2 = String(response.T2);
          } else if (fieldName === "T2") {
            if (response && response.P2 !== undefined)
              next.P2 = String(response.P2);
          }
          return next;
        });
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred");
        setResult(null);
      } finally {
        setLoading(false);
      }
    },
    [inputs, selectedSubstance]
  );

  useEffect(() => {
    if (isProgrammaticUpdateRef.current) return;
    if (lastUserInputFieldRef.current !== "P2") return;
    if (
      debouncedP2 === lastUserInputValueRef.current.P2 &&
      debouncedP2 !== ""
    ) {
      fetchBoilingPoint(debouncedP2, "P2");
    }
  }, [debouncedP2, fetchBoilingPoint]);

  useEffect(() => {
    if (isProgrammaticUpdateRef.current) return;
    if (lastUserInputFieldRef.current !== "T2") return;
    if (
      debouncedT2 === lastUserInputValueRef.current.T2 &&
      debouncedT2 !== ""
    ) {
      fetchBoilingPoint(debouncedT2, "T2");
    }
  }, [debouncedT2, fetchBoilingPoint]);

  const handleInputFocus = useCallback((e) => {
    const { name } = e.target;
    if (name === "P2" || name === "T2") {
      setResult(null);
      setError(null);
    }
  }, []);

  const clearAll = useCallback(() => {
    setSelectedSubstance("");
    setInputs({
      P1: "",
      T1: "",
      Hvap: "",
      P2: "",
      T2: "",
    });
    setResult(null);
    setError(null);
    setValidationErrors({});
    setIsSubstanceOpen(false);
  }, []);

  const toggleSubstanceDropdown = useCallback(() => {
    setIsSubstanceOpen((prev) => !prev);
  }, []);

  // Return all the state and functions that the UI needs
  return {
    // State
    selectedSubstance,
    inputs,
    result,
    loading,
    error,
    isSubstanceOpen,
    groupedSubstances,
    selectedSubstanceData,
    validationErrors,

    // Functions
    handleSubstanceChange,
    handleInputChange,
    handleInputFocus,
    clearAll,
    toggleSubstanceDropdown,
  };
}
