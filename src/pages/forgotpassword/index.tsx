import React, { useState } from "react"

import { Stack, Text } from "@chakra-ui/react"

import FormAuth from "../../components/formauth"
import Input from "../../components/input"
import Button from "../../components/button"
import Head from "next/head"
import axios from "axios"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleForgotPassword = async (e: any) => {
        e.preventDefault()
        console.log(`${window.location.origin}/api/uptadeToken`)
        console.log(JSON.stringify({ email }))
        await axios
            .post(`${window.location.origin}/api/updateToken`, JSON.stringify({ email }), {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(res => {
                if (res.data.success) {
                    // let token: any = res.data.token.token
                    // let body = {}
                    // console.log(JSON.stringify({ email }))
                    axios
                        .post(`${window.location.origin}/api/testnodemailer`, { email })
                        .then(data => {
                            console.log(data)
                        })
                        .catch(err => console.log(err))
                }
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        // try {
        //     const response = await fetch(`${window.location.origin}/api/updateToken`, {
        //         method: "POST",
        //         body: JSON.stringify({ email }),
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //     })
        //     console.log(response)

        //     if (response.status == 200) {
        //         setMessage("Email envoyé")
        //     } else {
        //         setMessage("Echec de l'envoie de mail")
        //     }
        // } catch (error) {
        //     setMessage("Network error occurred.")
        // }
    }

    return (
        <FormAuth title="MOT DE PASSE OUBLIE">
            <Input
                label="Vous allez recevoir un email de réinitialisation"
                placeholder="your-email@example.com"
                type="email"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
            />
            {message && <Text color={message.includes("Error") ? "red" : "black"}>{message}</Text>}

            <Stack spacing={10} pt={10}>
                <Button
                    title="Envoyer"
                    onClick={(e: any) => {
                        handleForgotPassword(e)
                    }}
                />
            </Stack>
        </FormAuth>
    )
}
