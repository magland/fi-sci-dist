import { FunctionComponent } from 'react';
type ElectrodeGeometryWidgetProps = {
    width: number;
    height: number;
    electrodeLocations: ElectrodeLocation[];
};
export type ElectrodeLocation = {
    x: number;
    y: number;
};
declare const ElectrodeGeometryWidget: FunctionComponent<ElectrodeGeometryWidgetProps>;
export default ElectrodeGeometryWidget;
