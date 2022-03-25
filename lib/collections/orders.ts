import api from '../fetch'

export const getManyOrders = async () => {
  return api('/orders')
}
