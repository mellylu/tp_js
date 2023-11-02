import {
    Box,
    chakra,
    Container,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
} from "@chakra-ui/react"
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { ReactNode } from "react"
import Logo from "../logo"

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode
    label: string
    href: string
}) => {
    return (
        <chakra.button
            bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
            rounded={"full"}
            w={8}
            h={8}
            cursor={"pointer"}
            as={"a"}
            href={href}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            transition={"background 0.3s ease"}
            _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
            }}
        >
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}

export default function SmallCentered() {
    return (
        <Box bg={useColorModeValue("#3b250e", "white")} color={useColorModeValue("white", "white")}>
            <Container
                as={Stack}
                maxW={"6xl"}
                py={4}
                spacing={4}
                justify={"center"}
                align={"center"}
            >
                <Logo />
                <Stack direction={"row"} spacing={6}>
                    <Box as="a" href={"/home"}>
                        Home
                    </Box>
                    <Box as="a" href={"/services"}>
                        Nos services
                    </Box>
                    <Box as="a" href={"#"}>
                        A propos
                    </Box>
                    <Box as="a" href={"#"}>
                        Contact
                    </Box>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("white", "white")}
            >
                <Container as={Stack} maxW={"6xl"} py={4} spacing={4} align={"center"}>
                    <Stack direction={"row"} spacing={6}>
                        <SocialButton label={"Twitter"} href={"#"}>
                            <FaTwitter />
                        </SocialButton>
                        <SocialButton label={"YouTube"} href={"#"}>
                            <FaYoutube />
                        </SocialButton>
                        <SocialButton label={"Instagram"} href={"#"}>
                            <FaInstagram />
                        </SocialButton>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}
