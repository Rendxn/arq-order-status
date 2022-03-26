import api from '../fetch'

export const getManyOrders = async () => {
  return api('/orders')
}

export const updateOneOrder = async (id: string, status: string) => {
  return api(`/orders/${id}`, { method: 'PATCH', body: { status } })
}
