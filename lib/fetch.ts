import { $fetch } from 'ohmyfetch'

const api = $fetch.create({ baseURL: process.env.NEXT_PUBLIC_API_URL ?? '' })

export default api
