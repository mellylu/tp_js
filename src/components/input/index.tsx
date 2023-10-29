import React, { useState } from "react"
import {
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Button,
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
                    <FormLabel>{props.label}</FormLabel>
                    <InputGroup>
                        <Input
                            type={showPassword ? "text" : "password"}
                            onChange={props.onChange}
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
                <FormControl id={props.id} isRequired={props.isRequired}>
                    <FormLabel>{props.label}</FormLabel>
                    <Input type={props.type} onChange={props.onChange} />
                </FormControl>
            )}
        </>
    )
}

export default Index
