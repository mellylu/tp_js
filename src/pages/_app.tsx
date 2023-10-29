import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
            <ToastContainer
                position="top-right"
                // toastStyle={{ backgroundColor: "#20232a" }}
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </ChakraProvider>
    )
}
