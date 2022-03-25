import { OrderDetail } from '~/models/OrderDetail'

interface IProps {
  details: OrderDetail[]
}

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
})

const OrderProductList: React.FC<IProps> = ({ details }) => {
  return (
    <>
      {details.map((detail) => (
        <div className="py-1" key={detail._id}>
          {detail.quantity && (
            <>
              <span className="font-medium capitalize text-slate-700">
                {detail.quantity}
              </span>
              <span className="text-slate-400"> &times; </span>
            </>
          )}
          <span className="font-medium capitalize text-slate-700">
            {detail.product}
          </span>
          {detail.price && (
            <>
              <span className="text-slate-400"> @ </span>
              <span className="font-medium capitalize text-slate-700">
                {formatter.format(detail.price)}
              </span>
            </>
          )}
        </div>
      ))}
    </>
  )
}

export default OrderProductList
