import { Widget } from "./widget.entity";

export const widgetProviders = [
    {
        provide: 'WIDGET_REPOSITORY',
        useValue: Widget,
    },
];