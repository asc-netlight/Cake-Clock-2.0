import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

import { WidgetAttributes, WidgetData } from "../types/Widget";
import { useConfig } from "./useConfig";
import { useLogger } from "./useLogger";

type Hook = () => {
  getData: () => Promise<void>;
  widgetData: WidgetData;
  saveData: (data: WidgetData) => Promise<Response>;
  isReady: boolean;
  setId: Dispatch<SetStateAction<string>>;
};

/**
 * This hook integrates with the available data API.
 *
 * - **isReady**: Indicates if the API is ready to be used and thus the data and method.
 * - **setId**: Allows you to set the ID for the data you wish to retrieve and set.
 * Usually used in combination with the clientId from the configuration
 * - **widgetData**: The data retrieved form the data API
 * - **getData**: The method for retrieving the data, returns only void but updates the `widgetData` state.
 * - **saveData**:  The method for saving the modified data. Returns the fetch promise to error handle.
 */
export const useDataApi: Hook = () => {
  const { config } = useConfig();
  const { logger } = useLogger("useDataApi");

  const [id, setId] = useState("global");
  const [widgetData, setWidgetData] = useState<WidgetData>({} as any);

  const isReady = useMemo(() => !!config?.["data-api"], [config]);
  const url = useMemo(() => (isReady ? `${config["data-api"]}?clientId=${id}` : ""), [
    isReady,
    config,
    id
  ]);

  const getData = useCallback<() => Promise<void>>(async () => {
    if (!process.browser) return;
    logger("Getting Data from Data API");

    await fetch(url, {
      mode: "cors"
    })
      .then(res => res.json())
      .then(x => setWidgetData(x))
      .catch(err => {
        console.error(url, err);
      });
  }, [url]);

  useEffect(() => {
    if (isReady) getData();
  }, [isReady, getData]);

  const saveData = useCallback<(data: WidgetData) => Promise<Response>>(
    dataToSave => {
      if (!process.browser) return;
      logger("Saving Data to Data API", config);

      return fetch(url, {
        body: JSON.stringify(dataToSave),
        method: "POST",
        mode: "cors"
      });
    },
    [url]
  );

  return {
    getData,
    widgetData,
    saveData,
    isReady,
    setId
  };
};
