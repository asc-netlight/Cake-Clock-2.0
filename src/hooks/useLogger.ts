// local type don't export. Move to ../types if export is needed
type Params = {
  logger: (...str: any[]) => void;
};

export const useLogger = (name: string): Params => {
  if (!process.browser)
    return {
      logger: () => {
        //
      }
    };

  const logger = (...str: any[]) => {
    console.debug(process.env.NEXT_PUBLIC_WIDGET_ID, name, ...str);
  };

  return { logger };
};
