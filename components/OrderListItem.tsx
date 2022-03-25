import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Fragment, useCallback, useEffect, useState } from 'react'
import api from '~/lib/fetch'
import { debounce } from 'debounce'
import { Order } from '~/models/Order'
import OrderProductList from './OrderProductList'

interface IProps {
  order: Order
}

const status = ['Creado', 'En reparto', 'Entregado']

const OrderListItem: React.FC<IProps> = ({ order }) => {
  const currentStatus = order.status ?? 'Creado'

  const [selected, setSelected] = useState<string>(currentStatus)

  const updateOrderStatus = useCallback(
    debounce(async (value: string) => {
      await api('/orders', { method: 'PATCH', body: { status: value } })
    }, 1000),
    []
  )

  const handleSelectChange = (value: string) => {
    setSelected(value)
    updateOrderStatus(value)
  }
  return (
    <div className="h-full w-full rounded-sm border-slate-300 bg-white shadow-md">
      <div className="flex h-full flex-col justify-between p-6">
        <div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Pedido # {order._id?.slice(0, 6)}
            </h2>
            <span className="block text-xs text-slate-400">{order._id}</span>
            <span className="text-sm font-medium capitalize text-slate-500">
              {format(new Date(order.entry_date), 'MMMM c, Y', { locale: es })}
            </span>
          </div>
          <div className="pt-4">
            <OrderProductList details={order.products} />
          </div>
        </div>
        <Listbox value={selected} onChange={handleSelectChange}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="block truncate capitalize">{selected}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {status.map((state, stateIdx) => (
                  <Listbox.Option
                    key={stateIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-slate-300 text-slate-900'
                          : 'text-slate-800'
                      }`
                    }
                    value={state}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {state}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-800">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  )
}

export default OrderListItem
