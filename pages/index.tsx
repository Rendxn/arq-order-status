import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import OrderListItem from '~/components/OrderListItem'
import { getManyOrders } from '~/lib/collections/orders'
import { Order } from '~/models/Order'

interface IProps {
  orders?: Order[]
}

const Home: NextPage<IProps> = ({ orders }) => {
  return (
    <>
      <Head>
        <title>Evergreen | Pedidos</title>
      </Head>
      <div className="min-h-screen bg-slate-50">
        <main className="container mx-auto grid w-full grid-cols-1 items-center justify-center gap-2 px-2 pt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {orders?.map((order) => (
            <OrderListItem key={order._id} order={order} />
          ))}
        </main>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const orders = await getManyOrders()

  return {
    props: {
      orders,
    },
  }
}
