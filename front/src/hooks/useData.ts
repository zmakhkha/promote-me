import { AxiosRequestConfig, CanceledError } from "axios";
import apiClient from "../services/api-client";
import { useState, useEffect } from "react";

interface FecthResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?: any[]) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FecthResponse<T>>(endpoint, { signal: controller.signal, ...requestConfig })
      .then((res) => 
        {
          setData(res.data.results)
          setLoading(false)
        })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false)

      });

    return () => controller.abort();
  }, deps? [...deps] : []);
  return { data, error, isLoading };
};

export default useData;
