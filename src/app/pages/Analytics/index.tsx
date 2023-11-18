import React, { useMemo } from "react"
import { Box } from "@mui/material"
import { Bar } from "react-chartjs-2"
import useLineChart from "utils/hooks/useLineChart";
import { useAppSelector } from "store";
import { stateSelector } from "store/slices/reportsSlice";
import { ReportsStateInterface } from "utils/interfaces/data";
import { ReportInterface } from "/utils/interfaces/data";

export default function Analytics(): React.ReactElement {
    const {
        options,
        months,
        colors,
    } = useLineChart();

    const { data } = useAppSelector(stateSelector) as ReportsStateInterface;
    const initialColumns = useMemo(() => data?.map((_: ReportInterface, idx: number) => ({
        value: 0,
        color: colors[idx],
    })), [data]);

    const columnValues = useMemo(() => data?.reduce((res: Array<any>, item: ReportInterface) => {
        const month = new Date(item.dateCreated).getMonth();
        ++res[month].value;

        return res;
    }, initialColumns) as Array<any>, [data]);;

    return (
        <Box>
            <Bar 
                data={{
                    labels: months,
                    datasets: [
                        {
                          minBarLength: 10,
                          label: "Reports' statistics per year",
                          data: columnValues.map(each => each.value),
                          backgroundColor: columnValues.map(each => each.color),
                          borderColor: columnValues.map(each => each.color),
                          borderWidth: 10,
                          borderRadius: 10
                        },
                    ]
                }}
                options={options} 
            />
        </Box>
    )
}