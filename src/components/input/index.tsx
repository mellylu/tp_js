import React, { useState } from "react"
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useColorModeValue,
} from "@chakra-ui/react"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"

const Index = (props: {
    label: string
    onChange: any
    type?: any
    id: any
    isRequired?: boolean
}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
            {props.id == "password" ? (
                <FormControl id={props.id} isRequired>
                    <FormLabel style={{ color: "black" }}>{props.label}</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? "text" : "password"}
                            onChange={props.onChange}
                            style={{ border: "1px solid black", backgroundColor: "white" }}
                        />
                        <InputRightElement h={"full"}>
                            <Button
                                variant={"ghost"}
                                onClick={() => setShowPassword(showPassword => !showPassword)}
                            >
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
            ) : (
                <FormControl style={{ color: "black" }} id={props.id} isRequired={props.isRequired}>
                    <FormLabel>{props.label}</FormLabel>
                    <Input
                        style={{ border: "1px solid black", backgroundColor: "white" }}
                        type={props.type}
                        onChange={props.onChange}
                    />
                </FormControl>
            )}
        </>
    )
}

export default Index
