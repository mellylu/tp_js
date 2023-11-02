import { Box, HStack, Stack, Text, Link } from "@chakra-ui/react"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import FormAuth from "../../components/formauth"
import Input from "../../components/input"
import Button from "../../components/button"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function Index() {
    const router = useRouter()
    const [user, setUser] = useState<Object>({})
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        await axios
            .post(`${window.location.origin}/api/existEmail`, user)
            .then(async (data: any) => {
                if (data.data.auth) {
                    await axios
                        .post(`${window.location.origin}/api/register`, user)
                        .then(res => {
                            if (res.data.auth) {
                                toast.success("Inscription enregistrée", {})
                                router.push("/login")
                            } else {
                                toast.error("Erreur inscription", { theme: "dark" })
                            }
                        })
                        .catch(err => {
                            toast.error(err.response.data.message, {
                                theme: "dark",
                            })
                        })
                } else {
                }
            })
            .catch(err => {
                toast.error(err.response.data.message, {
                    theme: "light",
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
                            onChange={(e: any) => {
                                setUser({ ...user, firstname: e.target.value })
                            }}
                        />
                    </Box>
                    <Box>
                        <Input
                            type="text"
                            id="lastName"
                            label="Nom"
                            onChange={(e: any) => {
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
                onChange={(e: any) => {
                    setUser({ ...user, email: e.target.value })
                }}
                isRequired
            />
            <Input
                id="password"
                isRequired
                label="Mot de passe"
                onChange={(e: any) => {
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
