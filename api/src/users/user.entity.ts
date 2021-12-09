import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  google_access_token: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  reddit_access_token: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  github_access_token: string;
}