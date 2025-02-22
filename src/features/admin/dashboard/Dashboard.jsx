import { useEffect, useState } from 'react';
import './Dashboard.css';
import DashboardStats from './DashboardStats';
import { getDashboardStats } from '../../../api/dashboardStats';
import SalesChart from "./SalesChart";

const Dashboard = () => {

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div className='dashboard'>
      {stats.map(stat => (
        <DashboardStats
          key={stat.id}
          title={stat.title}
          number={stat.number}
          icon={stat.icon}
          trend={stat.trend}
          trendNumber={stat.trendNumber}
          trendDescription={stat.trendDescription}
        />
      ))}
      <div className='dashboard__stats'>
        <SalesChart />
      </div>
    </div>
  );
};

export default Dashboard;
