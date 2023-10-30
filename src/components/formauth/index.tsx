import React from "react"
import { Flex, Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react"

const Index = (props: { title: string; children: any }) => {
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        {props.title}
                    </Heading>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    {props.children}
                </Box>
            </Stack>
        </Flex>
    )
}

export default Index
