import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {InputField} from "../UI/InputField";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {NotificationType, showNotification} from "../../store/features/uiSlice";
import {sendCreateParcelRequest, sendUpdateParcelRequest} from "../../http/parcel";
import {Parcel} from "../../model/entities/Parcel";
import {selectParcel, updateParcel} from "../../store/features/parcelSlice";

export const ParcelForm: React.FC = () => {
    const {id} = useParams();
    const [parcel, setParcel] = useState<Parcel | undefined>(useAppSelector(selectParcel(id)));

    const title = id ? 'Parcel Edit' : 'New Parcel';
    const subheader = id ? '' : 'Please fill out information to add new parcel.';
    const buttonText = id ? 'Save Changes' : 'Add Parcel';

    const [name, setName] = useState("");
    const nameValidator = {
        [`Name can only contain as least 2 character and spaces`]: /^(?=.*[a-zA-Z])[a-zA-Z\s]{2,}$/
    };
    const [nameIsValid, setNameIsValid] = useState(false);

    const [number, setNumber] = useState(1);
    const numberValidator = {
        [`Size must be larger than 0`]: /^[1-9]\d*$/
    };
    const [numberIsValid, setNumberIsValid] = useState(false);

    const [size, setSize] = useState(0);
    const sizeValidator = {
        [`Size must be larger than 0`]: /^\d*\.?\d*$/
    };
    const [sizeIsValid, setSizeIsValid] = useState(false);

    const formIsValid: boolean = (nameIsValid && numberIsValid && sizeIsValid && !id) ||
        ((name !== parcel?.name || number != parcel.number || size != parcel.size) && !!id);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (parcel) {
            setName(parcel.name);
            setSize(parcel.size);
            setNumber(parcel.number);
        }
    }, [parcel]);

    const handleFormSubmit: React.FormEventHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formIsValid) {
            const body = {
                name,
                size,
                number
            };
            if (id) {
                dispatch(showNotification({
                    message: "Saving parcel changes...",
                    type: NotificationType.INFO
                }));
                sendUpdateParcelRequest(id, body)
                    .then((response) => {
                        dispatch(showNotification({
                            message: "Successful parcel update!",
                            type: NotificationType.SUCCESS
                        }))
                        dispatch(updateParcel(response.data));
                        navigate("/parcel/" + id, {replace: true});
                    })
                    .catch((res) => {
                        dispatch(showNotification({message: res.response.data.error, type: NotificationType.ERROR}))
                    });
            } else {
                dispatch(showNotification({
                    message: "Parcel creation request has been sent.",
                    type: NotificationType.INFO
                }));
                sendCreateParcelRequest(body)
                    .then(() => {
                        dispatch(showNotification({
                            message: "Successful parcel creation!",
                            type: NotificationType.SUCCESS
                        }))
                        navigate("/parcel/all", {replace: true});
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
                                        validators={nameValidator}
                                        onValidityChange={(isValid) => setNameIsValid(isValid)}/>
                            <InputField label={"Number"} type={"number"} id={"number"} value={number}
                                        onChange={(event) => setNumber(event)} required={true}
                                        inputProps={{inputMode: 'numeric'}}
                                        validators={numberValidator}
                                        onValidityChange={(isValid) => {
                                            setNumberIsValid(isValid)
                                        }}/>
                            <InputField label={"Size"} type={"number"} id={"size"} value={size}
                                        onChange={(event) => setSize(event)} required={true}
                                        inputProps={{inputMode: 'numeric', pattern: '[1-9][0-9]*'}}
                                        validators={sizeValidator}
                                        onValidityChange={(isValid) => {
                                            setSizeIsValid(isValid)
                                        }}/>
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions style={{justifyContent: "center", marginTop: "16px"}}>
                    <Button disabled={!formIsValid && !!id} size={"large"} type="submit"
                            sx={{width: {xs: "100%", sm: "fit-content"}}}
                            variant={"contained"}>{buttonText}</Button>
                </CardActions>
            </form>
        </Card>
    );
};
