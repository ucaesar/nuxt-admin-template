import {Model, Column, Table, ForeignKey} from "sequelize-typescript";
import Resource from "./Resource";
import ResourceGroup from "./ResourceGroup";

@Table({ tableName: 'resource_resource_group' })
class ResourceResourceGroup extends Model<ResourceResourceGroup> {

  @ForeignKey(() => Resource)
  @Column
  resourceId!: number;

  @ForeignKey(() => ResourceGroup)
  @Column
  resourceGroupId!: number;
}

export default ResourceResourceGroup