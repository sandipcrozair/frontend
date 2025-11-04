import React, { Suspense, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { getCurrentLocation } from "../hooks/getCurrentLocation";
import calculatorApi from "../api/calculatorApi";
import Loader from "../components/Loader";
import PressureConverter2 from "../components/tools/PressureConverter/PressureConverter2";
import VacuumConverter2 from "../components/tools/VaccumConvertor/VacuumConverter2";

const ElevationCalculator = React.lazy(() =>
  import("../components/tools/altimeter/Altimeter")
);

const ToolPage = () => {
  const { toolName } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log("toolName", toolName);

  const fetchElevation = useCallback(
    async (lat, lon, triggerSource = "manual") => {
      setLoading(true);
      setError(null);
      try {
        console.log(
          `Fetching elevation - Lat: ${lat}, Lon: ${lon}, Trigger: ${triggerSource}`
        );

        let coordinates = { lat, lon };

        // If no coordinates provided, get current location
        if (!coordinates.lat || !coordinates.lon) {
          const location = await getCurrentLocation();
          coordinates = { lat: location.lat, lon: location.lon };
        }

        const response = await calculatorApi.getElevation({
          lat: coordinates.lat.toFixed(6),
          lon: coordinates.lon.toFixed(6),
        });

        setData({
          ...response,
          latitude: coordinates.lat, // Make sure these are included
          longitude: coordinates.lon, // Make sure these are included
          triggerSource,
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        setError(err.message || "Failed to fetch elevation");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleRefresh = async () => {
    setData(null);
    setError(null);
    setLoading(true);
    try {
      const { lat, lon } = await getCurrentLocation();
      const response = await calculatorApi.getElevation({ lat, lon });
      setData(response);
    } catch (err) {
      setError(err.message || "Failed to fetch elevation");
    } finally {
      setLoading(false);
    }
  };

  const renderTools = () => {
    switch (toolName.toLowerCase()) {
      case "pressure-converter":
        return <PressureConverter2 />;
      case "vacuum-converter":
        return <VacuumConverter2 />;
      case "elevation-calculator":
        return (
          <ElevationCalculator
            fetchElevation={fetchElevation}
            data={data}
            loading={loading}
            error={error}
            onRetry={handleRefresh}
          />
        );
      default:
        return (
          <p className="text-gray-500 text-center mt-6">Tools not found.</p>
        );
    }
  };

  return <Suspense fallback={<Loader />}>{renderTools()}</Suspense>;
};

export default ToolPage;
