import GridListWith from "@/components/card"
import SmallCentered from "@/components/footer"
import WithSubnavigation from "@/components/navbar"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"

const index = () => {
    const [username, setUsername] = useState("")
    const router = useRouter()
    const [visible, setVisible] = useState(false)
    const [services, setServices] = useState({})

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

        let request = 0

        function requests() {
            request += 1
            if (request >= 2) {
                setVisible(true)
            }
        }
        axios
            .get(`${window.location.origin}/api/verifytoken`, {
                headers: {
                    Authorization: token,
                },
            })
            .then(res => {
                axios
                    .get(`${window.location.origin}/api/getiduser/` + res.data.jwt.id)
                    .then(data => {
                        if (data.data.user) {
                            requests()
                            setUsername(data.data.content.firstname)
                        } else {
                            router.push("/login")
                        }
                    })
                    .catch((err: any) => {
                        router.push("/login")
                    })
            })
            .catch(error => {
                router.push("/login")
            })
        axios
            .get(`${window.location.origin}/api/getServices`)
            .then(res => {
                requests()
                setServices(res.data.data)
            })
            .catch(error => {
                router.push("/login")
            })
    }, [])

    return (
        <div>
            {visible ? (
                <div>
                    <WithSubnavigation username={username} />
                    <GridListWith services={services} />
                    <SmallCentered />
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default index
