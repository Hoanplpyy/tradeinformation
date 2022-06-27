import { ChartType } from "angular-google-charts/lib/types/chart-type";

export interface chartTypeSetting {
  type: ChartType.LineChart,
  data: (string | number)[][],
  chartColumns: string[],
}
