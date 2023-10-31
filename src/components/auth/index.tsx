'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';


export default function SimpleCard() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.status === 200) {
          const data = await response.json();
          const { token } = data;
          toast.success("connexion reussi", { theme: "dark",}
        );
        const router = useRouter();
             router.push('/home')
          // on peut stocker le token dans des cookies au cas ou
        } else {
            toast.error("Erreur inscription", {
                theme: "light",
            })
        }
      } catch (error) {
           console.log(error)
      }
    }
  
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Veuillez vous connecter</Heading>
            <FormControl id="email">
              <FormLabel>Adresse Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Mots de passe</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Se rappeler de moi</Checkbox>
              <Link href="/forgotpassword" color={"blue.400"}>
                        Mots de passe oublié ?
                    </Link>
            </Stack>
            <Stack>
            <Text align={"end"}>
                    <Link href="/register" color={"blue.400"}>
                        S'insrire ?
                    </Link>
                </Text>
            </Stack>
              <Button colorScheme={'blue'} variant={'solid'} onClick={handleLogin}>
                Connectez vous
              </Button>
            </Stack>
          </Stack>
        </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  )
}