"use client"

import { Text, Stack, Link, Checkbox } from "@chakra-ui/react"
import { useState } from "react"
import { toast } from "react-toastify"
import FormAuth from "../../components/formauth"
import Input from "../../components/input"
import Button from "../../components/button"
import { useRouter } from "next/router"

export default function SplitScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const creerCookie = (token: any) => {
        var e = null
        var date = new Date()
        date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000)
        e = "; expires=" + date.toISOString()
        console.log(e)
        document.cookie = "token" + "=" + token + e + "; path=/"
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            console.log(data)
            if (response.status === 200) {
                const token = data.token
                console.log(token)
                // localStorage.setItem("token", token)
                // document.cookie = `access_token=${token}
                creerCookie(token)
                router.push("/home")
                toast.success(data.message, {
                    theme: "dark",
                })
            } else {
                toast.error(data.message, {
                    theme: "light",
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormAuth title="SE CONNECTER">
            <Input
                type="text"
                id="email"
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                // onChange={(e: any) => {
                //     setUser({ ...user, email: e.target.value })
                // }}
            />
            <Input
                id="password"
                label="Mot de passe"
                onChange={(e: any) => setPassword(e.target.value)}
                // onChange={(e: any) => {
                //     setUser({ ...user, password: e.target.value })
                // }}
            />
            <Stack spacing={10}>
                <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                >
                    <Text />

                    <Text color={"black"}>
                        <Link href="/resetPassword">Mot de passe oublié ?</Link>
                    </Text>
                </Stack>
            </Stack>
            <Stack spacing={10} pt={10}>
                <Button
                    title="Se connecter"
                    onClick={(e: any) => {
                        handleLogin(e)
                    }}
                />
            </Stack>

            <Stack pt={6}>
                <Text color={"black"} align={"center"}>
                    Vous n'avez pas de compte ?{" "}
                    <Link href="/register" style={{ textDecoration: "underline" }} color={"black"}>
                        S'inscrire
                    </Link>
                </Text>
            </Stack>
        </FormAuth>
    )
}
