import React from 'react';
import { Card } from 'antd/';
import { Line } from '@ant-design/charts';

const DashboardChart: React.FC = () => {
    const data = [
        { month: 'Jan', value: 50 },
        { month: 'Feb', value: 75 },    
        { month: 'Mar', value: 100 },
        { month: 'Apr', value: 120 },
    ];

    const config = {
        data,
        xField: 'month',
        yField: 'value',
        smooth: true,
        autoFit: true,
    };

    return (
        <Card title="Doanh thu theo tháng">
            <Line {...config} />
        </Card>
    );
};

export default DashboardChart;
