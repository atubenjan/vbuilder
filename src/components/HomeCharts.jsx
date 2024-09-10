import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import HomeSummary from './HomeSummary';

const xLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const HomeCharts = () => {
  const [userCounts, setUserCounts] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/users/count-by-month',
        );
        const data = response.data;

        // Get the current month index (0-based)
        const currentMonthIndex = new Date().getMonth();

        // Slice data and labels up to the current month
        const trimmedLabels = xLabels.slice(0, currentMonthIndex + 1);
        const trimmedCounts = data.slice(0, currentMonthIndex + 1);

        setLabels(trimmedLabels);
        setUserCounts(trimmedCounts);
      } catch (error) {
        console.error('Error fetching user counts:', error);
      }
    };

    fetchUserCounts();
  }, []);

  return (
    <div className="px-2 pb-10 md:px-4">
      <h1 className="text-lg font-bold">Analytics</h1>
      <div className="items-center justify-between block w-full h-auto grid-cols-1 gap-2 lg:grid lg:grid-cols-2">
        <div className="pt-2 pl-2 mt-3 bg-white border rounded-lg w-fit h-fit border-slate-600">
          <h2>Users</h2>
          <LineChart
            width={window.innerWidth > 768 ? 450 : 300}
            height={window.innerWidth > 768 ? 300 : 200}
            series={[{ data: userCounts, label: 'Users' }]}
            xAxis={[{ scaleType: 'point', data: labels }]}
            yAxis={[{ min: 0 }]}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
        <HomeSummary />
      </div>
    </div>
  );
};

export default HomeCharts;
