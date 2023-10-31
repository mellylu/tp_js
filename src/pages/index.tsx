import SimpleCard from "@/components/auth"
import Head from "next/head"
import React, { useEffect } from "react"
import { useRouter } from "next/router"

export default function Home(props: any) {
    const router = useRouter()
    useEffect(() => {
        router.push("/login")
    }, [])
    console.log(props)

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main></main>
        </>
    )
}
