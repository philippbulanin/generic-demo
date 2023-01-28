import {Entity} from "../types/entites.enum";

export const TableName: Record<Entity, string> = {
  [Entity.Products]: 'Products',
  [Entity.Users]: 'Users'
}
