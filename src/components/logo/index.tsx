import React from "react"
import Image from "next/image"
import LogoImage from "../../../public/logo.jpg"
import { useRouter } from "next/router"

const Logo = () => {
    const router = useRouter()
    return (
        <button
            onClick={() => {
                router.push("/home")
            }}
        >
            <Image
                src={LogoImage}
                alt="logo"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
        </button>
    )
}

export default Logo
