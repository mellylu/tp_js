import React from "react"
import { Button } from "@chakra-ui/react"

const Index = (props: { onClick: any; title: string }) => {
    return (
        <Button
            loadingText="Submitting"
            size="lg"
            bg={"black"}
            color={"white"}
            _hover={{
                bg: "white",
                color: "black",
            }}
            onClick={props.onClick}
        >
            {props.title}
        </Button>
    )
}

export default Index
