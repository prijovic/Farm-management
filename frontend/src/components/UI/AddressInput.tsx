import React, {useState} from "react";
import {Autocomplete, debounce, Grid, TextField, Typography} from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import {Address} from "../../model/entities/Address";
import {useInput} from "../../hooks/useInput";
import axios from "axios";
import {config} from "../../config";
import {InputProps} from "../../model/props/InputProps";

interface FeatureProperties {
    city: string;
    country: string;
    postcode: string;
    housenumber: string;
    street: string;
}

interface Feature {
    properties: FeatureProperties
}

interface ApiResponse {
    features: Feature[]
}

export const AddressInput: React.FC<InputProps> = ({id, required, label, onValidityChange, onChange, value}) => {
    const [options, setOptions] = useState<readonly Address[]>([]);
    const [inputValue, setInputValue] = useState('');
    const useInputRes = useInput({
        required, label, onChange: (value: string) => {
            setInputValue(value)
        }, onValidityChange
    });

    const fetch = React.useMemo(
        () =>
            debounce(
                (
                    request: { input: string }
                ) => {
                    axios.get<ApiResponse>(`https://api.geoapify.com/v1/geocode/autocomplete?text=${request.input}&apiKey=${config.geoApiKey}`)
                        .then((response) => {
                            setOptions(response.data.features
                                .filter(f => f.properties.city && f.properties.country && f.properties.postcode && f.properties.housenumber && f.properties.street)
                                .map(f => new Address(f.properties.country, f.properties.city, f.properties.postcode, f.properties.street, f.properties.housenumber)));
                        })
                        .catch();
                },
                400,
            ),
        [],
    );

    React.useEffect(() => {
        if (inputValue === '') {
            setOptions(value ? [value] : []);
            onValidityChange(false);
            return undefined;
        }

        fetch({input: inputValue});
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id={id}
            getOptionLabel={(option) => option.toString()}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            isOptionEqualToValue={() => true}
            onChange={(event: any, newValue: Address | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                onChange(newValue);
                onValidityChange(true);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label={label + " *"} fullWidth/>
            )}
            renderOption={(props, option, {index}) => {

                return (
                    <li {...props} key={index}>
                        <Grid container alignItems="center">
                            <Grid item sx={{display: 'flex', width: 44}}>
                                <PlaceIcon sx={{color: 'text.secondary'}}/>
                            </Grid>
                            <Grid item sx={{width: 'calc(100% - 44px)', wordWrap: 'break-word'}}>
                                <Typography variant="body2" color="text.secondary">
                                    {option.toString()}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
};
