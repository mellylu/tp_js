import { ReactElement } from "react"
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react"
import { AiFillCheckCircle, AiFillLike, AiFillHeart } from "react-icons/ai"

interface FeatureProps {
    title: string
    text: string
    icon: ReactElement
}

const Feature = ({ title, text, icon }: FeatureProps) => {
    return (
        <Stack>
            <Flex
                // right={0}
                w={16}
                h={16}
                align={"center"}
                justify={"center"}
                color={"#3b250e"}
                rounded={"full"}
                mb={1}
            >
                {icon}
            </Flex>
            <Text color={"#3b250e"} fontWeight={600}>
                {title}
            </Text>
            <Text style={{ textAlign: "justify" }} color={"#573714"}>
                {text}
            </Text>
        </Stack>
    )
}

export default function SimpleThreeColumns() {
    return (
        <Box
            style={{ marginLeft: "10%", marginRight: "10%", marginTop: "5%", marginBottom: "5%" }}
            p={4}
        >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={20}>
                <Feature
                    icon={<Icon as={AiFillCheckCircle} w={10} h={10} />}
                    title={"Certification validée"}
                    text={
                        "Nos certificats sont validés tous les ans par des professionnels. Ils garantissent la sécurité de nos services."
                    }
                />
                <Feature
                    icon={<Icon as={AiFillLike} w={10} h={10} />}
                    title={"Devis rapide et pas cher"}
                    text={
                        "Obtenez un devis abordable pour notre service de conception de site web de qualité. Notre expertise vous assure un logement de qualité à un prix avantageux"
                    }
                />
                <Feature
                    icon={<Icon as={AiFillHeart} w={10} h={10} />}
                    title={"Expérience client"}
                    text={
                        "Notre équipe expérimentée est à votre disposition pour toutes demandes de rénovations. Plus de 95% de nos clients sont satisfaits par nos services"
                    }
                />
            </SimpleGrid>
        </Box>
    )
}
