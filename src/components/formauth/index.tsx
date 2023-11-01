import React from "react"
import { Flex, Box, Stack, Heading, useColorModeValue, SimpleGrid } from "@chakra-ui/react"
import Image from "next/image"
import Logo from "../../../public/logo.jpg"

const Index = (props: { title: string; children: any }) => {
    return (
        <div id="divmain">
            {/* <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}> */}
            <div style={{ display: "flex", width: "100%", height: "100%" }}>
                {/* <SimpleGrid id="simplegrid" columns={{ md: 2 }}> */}
                <Box id="boxform" style={{ padding: 0, height: "100%" }}>
                    <div id="form" style={{ width: "100%", height: "100%" }}>
                        <Image
                            style={{
                                marginRight: 0,
                                width: "100%",
                                height: "100%",
                            }}
                            alt={"Login Image"}
                            objectFit={"cover"}
                            src={Logo}
                            id="imageform"
                        />
                    </div>
                </Box>
                <Stack
                    id="stackform"
                    width="100%"
                    height="100%"
                    spacing={8}
                    margin="auto"
                    maxW={"lg"}
                    py={12}
                    px={6}
                >
                    <Box
                        mx={"auto"}
                        maxW={"lg"}
                        py={12}
                        px={6}
                        rounded={"lg"}
                        pr={8}
                        pl={8}
                        pt={8}
                        style={{
                            margin: "auto",
                            width: "100%",
                        }}
                        id="formcontour"
                    >
                        <Stack align={"center"}>
                            <Heading
                                pb={8}
                                style={{ color: "black" }}
                                fontSize={"4xl"}
                                textAlign={"center"}
                                id="headingform"
                            >
                                {props.title}
                            </Heading>
                        </Stack>
                        {props.children}
                    </Box>
                </Stack>
            </div>
        </div>
    )
}

export default Index

const responsiveForm = (props: { title: string; children: any }) => {
    return (
        <div>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Box
                    rounded={"lg"}
                    pr={8}
                    pl={8}
                    pt={8}
                    style={{
                        top: "0%",
                        right: "50%",
                        width: "100%",
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
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "50%",
                    }}
                    alt={"Login Image"}
                    objectFit={"cover"}
                    src={Logo}
                />
            </Flex>
        </div>
    )
}
