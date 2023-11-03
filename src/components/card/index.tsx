"use client"

import { Box, Container, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { ReactElement } from "react"

interface CardProps {
    heading: string
    description: string
    icon: ReactElement
}

const Card = ({ heading, description, icon }: CardProps) => {
    return (
        <Box
            maxW={{ base: "full", md: "275px" }}
            w={"full"}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
        >
            <Stack align={"start"} spacing={2}>
                {icon}
                <Box mt={2}>
                    <Heading size="md">{heading}</Heading>
                    <Text mt={1} fontSize={"sm"}>
                        {description}
                    </Text>
                </Box>
            </Stack>
        </Box>
    )
}

export default function GridListWith(props: { services?: any }) {
    return (
        <Box p={4} style={{ marginBottom: "5%", marginTop: "4%" }}>
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
                <Heading
                    style={{ marginBottom: "2%" }}
                    fontSize={{ base: "2xl", sm: "4xl" }}
                    fontWeight={"bold"}
                >
                    Présentation de nos services
                </Heading>
                <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
                    En tant qu'architecte d'intérieur, je façonne et sublime vos espaces, alliant
                    esthétisme et fonctionnalité, pour créer des intérieurs qui reflètent votre
                    identité et répondent à vos aspirations.
                </Text>
            </Stack>

            <Container maxW={"5xl"} mt={12}>
                <Flex flexWrap="wrap" gridGap={6} justify="center">
                    {props.services.map((service: any) => (
                        <Card
                            key={service.id}
                            heading={service.heading}
                            icon={
                                <Image
                                    src={service.icon}
                                    boxSize="100px"
                                    objectFit="cover"
                                    m="auto"
                                />
                            }
                            description={service.description}
                        />
                    ))}
                </Flex>
            </Container>
        </Box>
    )
}
