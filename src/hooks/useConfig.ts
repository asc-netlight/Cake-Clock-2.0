import { useEffect, useState } from "react";
import { WidgetConfig } from "types/Widget";

import { useLogger } from "./useLogger";

// local type don't export. Move to ../types if export is needed

type Params = {
  config: WidgetConfig;
};

/**
 * This hook retrieves the configuration for the widget that set by the dashboard admin.
 */
export const useConfig = (): Params => {
  const { logger } = useLogger("useData");
  const [config, setData] = useState<WidgetConfig>({} as any);

  useEffect(() => {
    if (process.browser) {
      window.addEventListener(
        "message",
        event => {
          if (event.origin !== process.env.NEXT_PUBLIC_DASHBOARD_ORIGIN) return;

          const data = event.data as WidgetConfig;
          logger("DATA CONF", typeof data.conf, data.conf);
          if (typeof data.conf === "string") data.conf = JSON.parse(data.conf as any);

          logger("DATA", data);
          setData(data);
        },
        false
      );

      window.parent.postMessage(process.env.NEXT_PUBLIC_WIDGET_ID, "*");
    }
  }, []);

  return {
    config
  };
};
