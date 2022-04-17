import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import toast from 'react-hot-toast'

import Loader from "../components/Loader"

export default function Home() {
  return (
    <>
      <div>
        <Loader show />
      </div>
      <button onClick={() => toast.success("TOAST!")}>Toast Me</button>
    </>

  )
}
