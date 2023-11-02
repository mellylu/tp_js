import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Head from "next/head"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Head>
                <link rel="icon" href="/favic.png" type="image/png" />
            </Head>
            <Component {...pageProps} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                toastStyle={{ backgroundColor: "black", color: "white" }}
            />
        </ChakraProvider>
    )
}
