import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export  interface User{
  id: number,
  email: string,
  name: string,
}

const Home: NextPage = ({data}:any) => {
  return (
    <div>
    <ul>
      {data.users.map((users:User) =>(
        <li key={users.id}>
          {users.name} {users.email}
        </li>
      ))}
    </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
   // Fetch data from external API
   const res = await fetch(`http://localhost:5000/users/`)
   const data = await res.json()
  console.log(data);
   // Pass data to the page via props
   return { props: { data } }
}

export default Home
