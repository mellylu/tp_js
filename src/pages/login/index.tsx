import { Text, Stack, Link } from "@chakra-ui/react"
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
        document.cookie = "token" + "=" + token + e + "; path=/"
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        try {
            const response = await fetch(`${window.location.origin}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })
            const data = await response.json()
            if (response.status === 200) {
                const token = data.token
                creerCookie(token)
                toast.success("Vous êtes connectés", {})
                router.push("/home")
            } else {
                toast.error(data.message, {
                    theme: "dark",
                })
            }
        } catch (error) {}
    }

    return (
        <FormAuth title="SE CONNECTER">
            <Input
                type="text"
                id="email"
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
            />
            <Input
                id="password"
                label="Mot de passe"
                onChange={(e: any) => setPassword(e.target.value)}
            />
            <Stack spacing={10}>
                <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                >
                    <Text />

                    <Text color={"black"}>
                        <Link href="/forgotpassword">Mot de passe oublié ?</Link>
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
