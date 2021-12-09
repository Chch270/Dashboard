import { Table, Model, Column, DataType } from "sequelize-typescript";

export enum widgetType {
    'Weather' = 'Weather',
    'Time' = 'Time',
    'Mails' = 'Mails',//google
    'Subs' = 'Subs',//reddit
    'Stars' = 'Stars',//gihub
    'Update Time' = 'Update Time',//github
    'Shiny Pokemon' = 'Shiny Pokemon',
};

@Table
export class Widget extends Model {
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id: number;

    @Column({
        type: DataType.ENUM('Weather', 'Time', 'Mails', 'Subs', 'Stars', 'Update Time', 'Shiny Pokemon'),
        allowNull: false,
    })
    type: widgetType;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    param1: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    param2: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    refreshTime: number;
}