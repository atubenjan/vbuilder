import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const users = [10, 30, 20, 27, 40, 53, 70, 67, 76, 89, 90, 100];
const organizations = [2, 5, 11, 9, 7, 12, 14, 16, 18, 20, 23, 25];
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
  return (
    <div className="px-2 pb-10 md:px-4">
      <h1 className="text-lg font-bold">Analytics</h1>
      <div className="items-center justify-between block w-full h-auto grid-cols-1 gap-2 lg:grid lg:grid-cols-2">
        <div className="pt-2 pl-2 mt-3 bg-white border rounded-lg w-fit h-fit border-slate-600">
          <h2>Users Vs Organization</h2>
          <LineChart
            width={window.innerWidth > 768 ? 450 : 300}
            height={window.innerWidth > 768 ? 300 : 200}
            series={[
              { data: organizations, label: 'Organizations' },
              { data: users, label: 'Users' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
        <div className="pt-2 pl-2 my-3 bg-white border rounded-lg w-fit h-fit border-slate-600">
          <h2>Total Quiz</h2>
          <LineChart
            width={window.innerWidth > 768 ? 450 : 300}
            height={window.innerWidth > 768 ? 300 : 200}
            series={[{ data: users, label: 'Quiz' }]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
        <div className="pt-2 pl-2 bg-white border rounded-lg w-fit h-fit border-slate-600">
          <h2>Quiz Attempted</h2>
          <LineChart
            width={window.innerWidth > 768 ? 450 : 300}
            height={window.innerWidth > 768 ? 300 : 200}
            series={[{ data: users, label: 'Quiz' }]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeCharts;
