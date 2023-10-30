import { useState } from "react";
import { Button, FormControl, Input, Stack } from "@chakra-ui/react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("/api/updateToken", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Gestion de la réussite de l'envoi de l'e-mail
        alert("Email sent for password reset.");
        
      } else {
        // Gestion des erreurs
        alert("Failed to send email for password reset.");
      }
    } catch (error) {
      // Gestion des erreurs réseau
      console.error(error);
    }
  };

  return (
    <Stack spacing={4}>
      <FormControl id="email">
        <Input
          placeholder="your-email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          _placeholder={{ color: "gray.500" }}
          type="email"
        />
      </FormControl>
      <Button
        bg={"blue.400"}
        color={"white"}
        _hover={{
          bg: "blue.500",
        }}
        onClick={handleForgotPassword} 
      >
        Request Reset
      </Button>
    </Stack>
  );
}
