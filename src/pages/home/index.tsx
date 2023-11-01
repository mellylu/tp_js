import WithSubnavigation from "@/components/navbar"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import ImageHome from "../../../public/imagehome.jpg"
import CaptionCarousel from "@/components/carrousel"
import SimpleThreeColumns from "@/components/block"
import SmallCentered from "@/components/footer"
import axios from "axios"
import { useRouter } from "next/router"

const Index = () => {
    const [username, setUsername] = useState("")
    const router = useRouter()
    const [visible, setVisible] = useState(false)

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
        axios
            .get("http://localhost:3000/api/verifytoken", {
                headers: {
                    Authorization: token,
                },
            })
            .then(res => {
                console.log()
                axios
                    .get("http://localhost:3000/api/getiduser/" + res.data.jwt.id)
                    .then(data => {
                        if (data.data.user) {
                            //data.data.content.firstname.charAt(0).toUpperCase()
                            setVisible(true)
                            setUsername(data.data.content.firstname)
                        } else {
                            router.push("/login")
                        }
                    })
                    .catch((err: any) => {
                        console.log(err)
                        router.push("/login")
                    })
            })
            .catch(error => {
                console.error(error)
                router.push("/login")
            })
    }, [])

    return (
        <div>
            {visible ? (
                <div>
                    <WithSubnavigation
                        username={
                            "Bienvenue " + username.charAt(0).toUpperCase() + username.slice(1)
                        }
                    />
                    <CaptionCarousel />
                    <SimpleThreeColumns />
                    <SmallCentered />
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default Index
