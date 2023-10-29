import React from "react"
import { Button } from "@chakra-ui/react"

const Index = (props: { onClick: any; title: string }) => {
    return (
        <Button
            loadingText="Submitting"
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
                bg: "blue.500",
            }}
            onClick={props.onClick}
        >
            {props.title}
        </Button>
    )
}

export default Index
