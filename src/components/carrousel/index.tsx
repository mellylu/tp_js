import React from "react"
import {
    Box,
    IconButton,
    useBreakpointValue,
    Stack,
    Heading,
    Text,
    Container,
} from "@chakra-ui/react"
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi"
import Slider from "react-slick"

const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
}

export default function CaptionCarousel() {
    const [slider, setSlider] = React.useState<Slider | null>(null)

    const top = useBreakpointValue({ base: "90%", md: "50%" })
    const side = useBreakpointValue({ base: "30%", md: "40px" })

    const cards = [
        {
            image: "https://www.deco.fr/sites/default/files/styles/width_880/public/2020-10/shutterstock_391616107.jpg?itok=K6aTOi-W",
        },
        {
            image: "https://cache.marieclaire.fr/data/photo/w1200_h630_ci/5l/style-chalet1.jpg",
        },
        {
            image: "https://resize.elle.fr/article/var/plain_site/storage/images/deco/reportages/visites-maisons/bois-et-chaux-le-duo-contemporain-de-ce-mas-provencal/90365095-1-fre-FR/Bois-et-chaux-le-duo-contemporain-de-ce-mas-provencal.jpg",
        },
    ]

    return (
        <Box position={"relative"} width={"full"} overflow={"visible"}>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <IconButton
                aria-label="left-arrow"
                variant="ghost"
                position="absolute"
                left={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                onClick={() => slider?.slickPrev()}
                color="#3b250e"
                backgroundColor="white"
            >
                <BiLeftArrowAlt size="40px" />
            </IconButton>
            <IconButton
                aria-label="right-arrow"
                variant="ghost"
                position="absolute"
                right={side}
                top={top}
                transform={"translate(0%, -50%)"}
                zIndex={2}
                color="#3b250e"
                backgroundColor="white"
                onClick={() => slider?.slickNext()}
            >
                <BiRightArrowAlt size="40px" />
            </IconButton>
            {/* Slider */}
            <Slider {...settings} ref={(slider: any) => setSlider(slider)}>
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        height={"1xl"}
                        position="relative"
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        backgroundImage={`url(${card.image})`}
                    >
                        <Container
                            width="100%"
                            size="container.lg"
                            height="640px"
                            position="relative"
                        >
                            <Stack
                                spacing={6}
                                width="100%"
                                maxW={"lg"}
                                // marginTop={"15%"}
                                position="absolute"
                                top="50%"
                                left="50%"
                                transform="translate(-50%, -50%)"
                                // backgroundColor="black"
                                padding={{ base: "5%", md: "3%" }}
                                borderRadius="5px"
                            >
                                <Heading
                                    color="black"
                                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                                    textAlign="center"
                                >
                                    Alain Terrieur
                                </Heading>
                                <Text
                                    textAlign="center"
                                    fontSize={{ base: "md", lg: "1xl" }}
                                    color="black"
                                >
                                    Vous propose une prestation complète pour mettre en valeur votre
                                    habitation afin de vendre, louer ou simplement vous sentir bien
                                    chez vous
                                </Text>
                            </Stack>
                        </Container>
                    </Box>
                ))}
            </Slider>
        </Box>
    )
}
