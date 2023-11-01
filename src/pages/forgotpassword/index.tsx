import React, { useState } from "react"

import { FormControl, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react"

import FormAuth from "../../components/formauth"
import Input from "../../components/input"
import Button from "../../components/button"

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleForgotPassword = async () => {
        console.log(JSON.stringify({ email }))
        try {
            const response = await fetch("/api/updateToken", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            console.log(response)

            if (response.ok) {
                setMessage("Email sent for password reset.")
            } else {
                setMessage("Failed to send email for password reset.")
            }
        } catch (error) {
            console.error(error)
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
            {message && <Text color={message.includes("Error") ? "red" : "green"}>{message}</Text>}

            <Stack spacing={10} pt={10}>
                <Button title="Envoyer" onClick={handleForgotPassword} />
            </Stack>
        </FormAuth>
    )
}
