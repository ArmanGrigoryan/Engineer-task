import React, { useContext, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useAppSelector } from "store";
import { stateSelector } from "store/slices/reportsSlice";
import { FilterValue, ReportsStateInterface } from "utils/interfaces/data";
import { FilterContext } from "../../../App";

export default function withFiltering(Component: React.FC): React.FC {
    return function Comp (props: any): React.ReactElement {
        const [item, setItem] = React.useState<any>("");
        const [filter, setFitler] = useState<string>("");

        const { filterChangeHandler } = useContext(FilterContext);

        const { filterValues, loading } = useAppSelector(stateSelector) as ReportsStateInterface;

        const changeHandler = (_: any, newValue: FilterValue) => {
            setItem(newValue);
            filterChangeHandler(newValue?.id);
        }

        return (
            <>
                {
                    !loading && (
                        <Autocomplete
                            id="combo-box-demo"
                            value={item}
                            onChange={changeHandler}
                            inputValue={filter}
                            onInputChange={(_, newInputValue) => setFitler(newInputValue)}
                            disablePortal
                            options={filterValues}
                            sx={{ width: 300, marginBottom: "20px" }}
                            renderInput={params => <TextField {...params} label="Select user..." />} 
                        />
                    )
                }

                <Component {...props} item={item} />
            </>
        )
    }
}