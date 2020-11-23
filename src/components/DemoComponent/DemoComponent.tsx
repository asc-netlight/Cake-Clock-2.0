import { useConfig } from "hooks/useConfig";
import { useDataApi } from "hooks/useDataApi";
import { useLogger } from "hooks/useLogger";
import { FC, useEffect } from "react";

import styles from "./styles.module.css";

type Props = {
  buildTime: number;
};

const DemoComponent: FC<Props> = ({ buildTime }) => {
  const { widgetData, saveData, isReady } = useDataApi();
  const { logger } = useLogger("DemoComponent");
  const { config } = useConfig();

  useEffect(() => {
    if (isReady)
      saveData({
        val: 123
      });
  }, [isReady, saveData]);

  return (
    <div>
      <h1 className={styles.title}>Hello World</h1>
      <h2 data-testid="buildTime" data-value={buildTime}>
        Build Time: {buildTime}
      </h2>
      <p>This is the widget configuration, you can&apos;t change this.</p>
      <pre className={styles.code}>{JSON.stringify(config, null, 2)}</pre>
      <p>
        This is the widget data, you can change this. Both for the individual client or globally
      </p>
      <pre className={styles.code}>{JSON.stringify(widgetData, null, 2)}</pre>
    </div>
  );
};

export default DemoComponent;
