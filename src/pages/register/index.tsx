import { Box, HStack, Stack, Text, Link } from "@chakra-ui/react"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import FormAuth from "../../components/formauth"
import Input from "../../components/input"
import Button from "../../components/button"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Head from "next/head"

export default function Index() {
    const router = useRouter()
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        return emailRegex.test(email)
    }

    const validatePassword = (password: string | any[]) => {
        return password.length >= 8
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!validateEmail(user.email)) {
            toast.error("Format d'email invalide", { theme: "dark" })
            return
        }

        if (!validatePassword(user.password)) {
            toast.error("Le mot de passe doit avoir au moins 8 caractères", {
                theme: "dark",
            })
            return
        }
        await axios
            .post(`${window.location.origin}/api/existEmail`, user, {})
            .then(async data => {
                console.log(data)
                if (data.data.auth) {
                    await axios
                        .post(`${window.location.origin}/api/register`, user, {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                        .then(res => {
                            if (res.data.auth) {
                                toast.success("Inscription enregistrée", {})
                                router.push("/login")
                            } else {
                                toast.error("Erreur inscription", { theme: "dark" })
                            }
                        })
                        .catch(err => {
                            toast.error("Erreur base de données", {
                                theme: "dark",
                            })
                        })
                } else {
                    toast.error(data.data.message, {
                        theme: "dark",
                    })
                }
            })
            .catch(err => {
                toast.error("Erreur base de données", {
                    theme: "dark",
                })
            })
    }

    return (
        <FormAuth title="S'INSCRIRE">
            <Stack spacing={4}>
                <HStack>
                    <Box>
                        <Input
                            type="text"
                            id="firstName"
                            label="Prénom"
                            onChange={(e: { target: { value: any } }) => {
                                setUser({ ...user, firstname: e.target.value })
                            }}
                        />
                    </Box>
                    <Box>
                        <Input
                            type="text"
                            id="lastName"
                            label="Nom"
                            onChange={(e: { target: { value: any } }) => {
                                setUser({ ...user, lastname: e.target.value })
                            }}
                        />
                    </Box>
                </HStack>
            </Stack>
            <Input
                type="text"
                id="email"
                label="Email"
                onChange={(e: { target: { value: any } }) => {
                    setUser({ ...user, email: e.target.value })
                }}
                isRequired
            />
            <Input
                id="password"
                isRequired
                label="Mot de passe"
                type="password"
                onChange={(e: { target: { value: any } }) => {
                    setUser({ ...user, password: e.target.value })
                }}
            />
            <Stack spacing={10} pt={10}>
                <Button
                    title="S'inscrire"
                    onClick={(e: any) => {
                        handleSubmit(e)
                    }}
                />
            </Stack>
            <Stack pt={6}>
                <Text color={"black"} align={"center"}>
                    Vous avez déjà un compte ?{" "}
                    <Link href="/login" style={{ textDecoration: "underline" }} color={"black"}>
                        Se connecter
                    </Link>
                </Text>
            </Stack>
        </FormAuth>
    )
}
