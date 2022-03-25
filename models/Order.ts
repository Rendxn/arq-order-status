import { OrderDetail } from './OrderDetail'

export interface Order {
  _id?: string
  status?: string
  products: OrderDetail[]
  entry_date: string | Date
  exit_date: string | Date
  client: string
}
