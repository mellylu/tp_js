import { useState, useEffect } from "react"
import { Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import FormAuth from "../../components/formauth"
import Input from "../../components/input"
import Button from "../../components/button"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Head from "next/head"

export default function Index() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const router = useRouter()

    useEffect(() => {
        const url = window.location.search.split("=")[1]
        axios
            .get(`${window.location.origin}/api/resetPassword/` + url)
            .then((data: any) => {
                if (data.data.data !== null) {
                    axios
                        .get(`${window.location.origin}/api/getiduser/` + data.data.data.userId)
                        .then((data: any) => {
                            if (data.data.content) {
                                setEmail(data.data.content.email)
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
        if (password.length < 8) {
            // setPasswordError("Le mot de passe doit comporter au moins 8 caractères")
            toast.error("Le mot de passe doit comporter au moins 8 caractères", {
                theme: "dark",
            })
            return
        } else {
            setPasswordError("")
        }
        console.log(JSON.stringify({ email, password }))
        try {
            const response = await fetch(`${window.location.origin}/api/updatePassword`, {
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
