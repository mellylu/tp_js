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
            .post(`http://localhost:3000/api/register`, user)
            .then(res => {
                if (res.data.auth) {
                    toast.success("Inscription enregistrée", {
                        theme: "light",
                    })
                    router.push("/")
                } else {
                    toast.error("Erreur inscription", {
                        theme: "light",
                    })
                }
            })
            .catch(err => {
                toast.error("Erreur inscription", {
                    theme: "light",
                })
            })
    }

    return (
        <FormAuth title="S'inscrire">
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
            <Stack spacing={10} pt={2}>
                <Button
                    title="S'inscrire"
                    onClick={(e: any) => {
                        handleSubmit(e)
                    }}
                />
            </Stack>
            <Stack pt={6}>
                <Text align={"center"}>
                    Vous avez déjà un compte ?{" "}
                    <Link href="/login" color={"blue.400"}>
                        Se connecter
                    </Link>
                </Text>
            </Stack>
        </FormAuth>
    )
}
