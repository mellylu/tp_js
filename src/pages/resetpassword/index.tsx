import { useState, useEffect } from "react"
import { Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import FormAuth from "../../components/formauth"
import Input from "../../components/input"
import Button from "../../components/button"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSearchParams } from "next/navigation"

import { usePathname } from "next/navigation"

export default function Index() {
    const [email, setEmail] = useState("melly.lucas32@gmail.com")
    const [password, setPassword] = useState("")
    const router = useRouter()

    useEffect(() => {
        axios
            .get(`${window.location.origin}/api/resetPassword/` + router.query.token)
            .then((data: any) => {
                if (data.data.data !== null) {
                    axios
                        .get(`${window.location.origin}/api/getiduser/` + data.data.data.userId)
                        .then((data: any) => {
                            if (data.user) {
                                setEmail(data.content.email)
                            }
                        })
                        .catch((err: any) => {})
                } else {
                    router.push("/login")
                }
            })
            .catch(err => {
                router.push("/login")
            })
    }, [])

    const handleResetPassword = async () => {
        try {
            const response = await fetch("/api/updatePassword", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response.ok) {
                toast.success("Mot de passe mis à jour avec succès", {})

                router.push("/login")
            } else {
                toast.error("Echec de mise à jour du mot de passe", { theme: "dark" })
            }
        } catch (error) {}
    }

    return (
        <FormAuth title="SAISIR UN NOUVEAU MOT DE PASSE">
            <Input
                label="Nouveau mot de passe"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                type="password"
            />

            <Stack spacing={10} pt={10}>
                <Button title="Confirmer" onClick={handleResetPassword} />
            </Stack>
        </FormAuth>
    )
}
