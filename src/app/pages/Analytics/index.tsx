import React from "react"
import { Box } from "@mui/material"
import { Bar, Line } from "react-chartjs-2"
import useLineChart from "utils/hooks/useLineChart";
import { useAppSelector } from "store";
import { stateSelector } from "store/slices/reportsSlice";
import { ReportsStateInterface } from "utils/interfaces/data";

export default function Analytics(): React.ReactElement {
    const {
        graphoptions,
        barlabels,
        barData,
        colors,
    } = useLineChart();

    const { data } = useAppSelector(stateSelector) as ReportsStateInterface;

    return (
        <Box>
            <Line
                datasetIdKey='id'
                data={{
                    labels: barlabels,
                    datasets: data.map((each, idx) => ({
                        id: each.id,
                        label: `Report ${each.id}`,
                        data: [Math.random(), Math.random()],

                        backgroundColor: colors[idx],
                        borderColor: colors[idx],
                    }))
                }}
            />

            <Bar 
                data={barData}
                options={graphoptions} 
            />
        </Box>
    )
}