import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { useGetDashboardStatsQuery } from '@/services/DashboardApi'

const LineChart: React.FC = () => {
    const { data } = useGetDashboardStatsQuery()
    console.log(data);
    
    const lineChartData = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ],
        datasets: [
            {
                label: 'Sales',
                data: data?.salesData,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    }

    return <Line data={lineChartData} />
}

export default LineChart
