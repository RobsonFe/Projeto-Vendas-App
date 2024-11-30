import { Layout } from 'components';
import Head from 'next/head';

const Home: React.FC = () => {
  return (

    <div>
      <Head>
        <title>Vendas App</title>
        <meta name="description" content="Sistema de vendas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="author" content="Robson Ferreira"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
     <Layout />
    </div>
  )
}

export default Home;
