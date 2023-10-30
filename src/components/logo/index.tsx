import React from "react"
import Image from "next/image"
import LogoImage from "../../../public/logo.jpg"

const Logo = () => {
    return (
        <Image src={LogoImage} alt="logo" style={{ width: 50, height: 50, borderRadius: "50%" }} />
    )
}

export default Logo
