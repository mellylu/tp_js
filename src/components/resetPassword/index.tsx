import { useState } from "react";
import { Button, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router"; 

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 
  const handleResetPassword = async () => {
    try {
      const response = await fetch("/api/updatePassword", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Password reset successful.");
        console.log("Redirecting to /login");
        router.push('/login'); 
      } else {
        alert("Failed to reset password.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Entrez un nouveau mdp
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Adresse Email</FormLabel>
          <Input
            placeholder="your-email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Mots de Passe</FormLabel>
          <Input
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={handleResetPassword}
          >
            Confirmer
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
