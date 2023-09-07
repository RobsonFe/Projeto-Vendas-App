import Head from 'next/head'
import { Layout } from 'components';

const Home: React.FC = () => {
  return (

    <div>
      <Head>
        <title>Vendas App</title>
        <meta name="description" content="Sistema de vendas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
     <Layout />
    </div>
  )
}

export default Home;
