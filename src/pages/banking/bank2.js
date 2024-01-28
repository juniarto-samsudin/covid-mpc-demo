import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Layout from '@/components/banking/Layout'
import { Button, Container, Card } from 'semantic-ui-react'

//import Connect from '@/components/mpc.js'
//const inter = Inter({ subsets: ['latin'] })
import Connect from '@/components/banking/Connect'
import CSVFileLoader from '@/components/CSVFileLoader'


export default function Home() {

  const onSubmit =  (event) => {
    event.preventDefault();
    console.log('clicked')
    var computation_id = 'test';
    var party_count = 2;

    Connect('http://localhost:8080', computation_id);
  }

  return (
    <Layout name="Bank B">
      <Container>
        <Connect />
        {/* <Button primary type='submit' onClick={onSubmit}>Connect</Button> */}
      </Container>
    </Layout>

  )
}
