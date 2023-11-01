import React, { useState } from "react"

import { Stack, Text } from "@chakra-ui/react"

import FormAuth from "../../components/formauth"
import Input from "../../components/input"
import Button from "../../components/button"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleForgotPassword = async () => {
        try {
            const response = await fetch("/api/updateToken", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (response.ok) {
                setMessage("Email sent for password reset.")
            } else {
                setMessage("Failed to send email for password reset.")
            }
        } catch (error) {
            setMessage("Network error occurred.")
        }
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
                <Button title="Envoyer" onClick={handleForgotPassword} />
            </Stack>
        </FormAuth>
    )
}
