export interface WidgetConfig {
  "client-id": string;
  conf: WidgetAttributes;
  "data-api": string;
  height: number;
  width: number;
}
export interface WidgetAttributes {
  // TODO: type your widget's configuration and data needs
  name1: string;
  name2: string;
  name3: string;
}

export interface WidgetData {
  val: unknown;
}
