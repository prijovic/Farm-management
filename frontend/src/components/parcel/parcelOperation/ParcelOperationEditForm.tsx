import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {InputField} from "../../UI/InputField";
import {sendCreateParcelOperationRequest} from "../../../http/parcel";
import {useParams} from "react-router-dom";
import {NotificationType, showNotification} from "../../../store/features/uiSlice";
import {useAppDispatch} from "../../../store/hooks";
import {addParcelOperation} from "../../../store/features/parcelSlice";

export const ParcelOperationEditForm: React.FC<{ closeDialog: () => void }> = ({closeDialog}) => {
    const {id: parcelId} = useParams();
    const title = "New Operation";
    const subheader = "Please fill out information to add new operation";
    const buttonText = "Add Operation";
    const [name, setName] = useState("");
    const [nameIsValid, setNameIsValid] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionIsValid, setDescriptionIsValid] = useState(false);
    const validator = (fieldName: string) => {
        return {
            [`${fieldName} can only contain as least 2 character and spaces`]: /^(?=.*[a-zA-Z])[a-zA-Z\s]{2,}$/
        }
    };
    const dispatch = useAppDispatch();

    const formIsValid: boolean = nameIsValid && descriptionIsValid;

    const handleFormSubmit: React.FormEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formIsValid) {
            if (parcelId) {
                dispatch(showNotification({
                    message: "Operation creation request has been sent.",
                    type: NotificationType.INFO
                }));
                sendCreateParcelOperationRequest(parcelId, {
                    name,
                    description
                })
                    .then((response) => {
                        dispatch(showNotification({
                            message: "Successful operation creation!",
                            type: NotificationType.SUCCESS
                        }))
                        dispatch(addParcelOperation(response.data));
                        closeDialog();
                    })
                    .catch((res) => {
                        dispatch(showNotification({message: res.response.data.error, type: NotificationType.ERROR}))
                    })
            }
        }


    }

    return (
        <Card className={"form"} sx={{maxWidth: {xs: "80%", sm: "500px"},}}>
            <CardHeader
                title={title}
                titleTypographyProps={{component: "h1", variant: "h4"}}
                subheader={subheader}
                subheaderTypographyProps={{component: "p", variant: "subtitle1", gutterBottom: true}}
            />
            <form onSubmit={handleFormSubmit}>
                <CardContent>
                    <Stack spacing={6}>
                        <Stack spacing={2} direction={'column'}>
                            <InputField label={"Name"} type={"text"} id={"name"} value={name}
                                        onChange={(event) => setName(event)} required={true}
                                        validators={validator("Name")}
                                        onValidityChange={(isValid) => setNameIsValid(isValid)}/>
                            <InputField label={"Description"} type={"text"} id={"description"} value={description}
                                        onChange={(event) => setDescription(event)} required={true}
                                        validators={validator("Description")}
                                        multiline={true} rows={4}
                                        onValidityChange={(isValid) => setDescriptionIsValid(isValid)}/>
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions
                    style={{justifyContent: "center", marginTop: "16px", gap: "1rem"}}>
                    <Button disabled={!formIsValid} size={"large"} type="submit"
                            sx={{width: {xs: "100%", sm: "fit-content"}}}
                            variant={"contained"}>{buttonText}</Button>
                </CardActions>
            </form>
        </Card>
    );
};
