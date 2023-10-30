import WithSubnavigation from "@/components/navbar"
import Image from "next/image"
import React from "react"
import ImageHome from "../../../public/imagehome.jpg"
import CaptionCarousel from "@/components/carrousel"
import SimpleThreeColumns from "@/components/block"
import SmallCentered from "@/components/footer"

const Index = () => {
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
