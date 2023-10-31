import WithSubnavigation from "@/components/navbar"
import Image from "next/image"
import React, { useEffect } from "react"
import ImageHome from "../../../public/imagehome.jpg"
import CaptionCarousel from "@/components/carrousel"
import SimpleThreeColumns from "@/components/block"
import SmallCentered from "@/components/footer"

const Index = () => {
    useEffect(() => {
        let nom = "token"
        nom = nom + "="
        var liste = document.cookie.split(";")
        let token
        for (var i = 0; i < liste.length; i++) {
            var c = liste[i]
            while (c.charAt(0) == " ") c = c.substring(1, c.length)
            if (c.indexOf(nom) == 0) {
                token = c.substring(nom.length, c.length)
            }
        }
        console.log(token, "token")
    }, [])
    return (
        <div>
            <WithSubnavigation />
            <CaptionCarousel />
            <SimpleThreeColumns />
            <SmallCentered />
        </div>
    )
}

export default Index
