import React from "react"
import { Flex, Box, Stack, Heading, useColorModeValue, SimpleGrid } from "@chakra-ui/react"
import Image from "next/image"
import Logo from "../../../public/logo.jpg"

const Index = (props: { title: string; children: any }) => {
    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("white", "white")}

            // backgroundImage={`url(https://w.forfun.com/fetch/be/be9275db225d5fffe78d35fd38a31585.jpeg)`}
        >
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Box
                    rounded={"lg"}
                    // boxShadow={"red"}
                    pr={8}
                    pl={8}
                    pt={8}
                    // style={{ backgroundColor: "white" }}
                    style={{
                        position: "absolute",
                        top: "15%",
                        right: "10%",
                        width: "30%",
                    }}
                >
                    <Stack align={"center"}>
                        <Heading
                            pb={8}
                            style={{ color: "black" }}
                            fontSize={"4xl"}
                            textAlign={"center"}
                        >
                            {props.title}
                        </Heading>
                    </Stack>
                    {props.children}
                </Box>
            </Stack>

            <Flex flex={1}>
                <Image
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "50%",
                        height: "100%",
                    }}
                    alt={"Login Image"}
                    objectFit={"cover"}
                    src={Logo}
                />
            </Flex>
        </Flex>
    )
}

export default Index
