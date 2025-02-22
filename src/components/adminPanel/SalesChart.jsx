import { useEffect, useState, useRef } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { getSalesData } from '../../services/salesService';

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSalesData();
      setSalesData(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setKey(prev => prev + 1);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);

  const Chart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={salesData}
        margin={{
          top: 25,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id='colorSales' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeOpacity={0.05} strokeDasharray='0 0' />
        <XAxis dataKey='time' />
        <YAxis dataKey='value' />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '5px',
            padding: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        />
        <Area
          type='monotone'
          dataKey='value'
          stroke='#8884d8'
          fill="url(#colorSales)"
          isAnimationActive={true}
          animationDuration={1500}
          animationBegin={0}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div style={{ width: '100%', height: '80%' }} ref={chartRef}>
      <h2 className='sales-chart__title'>Detalle de ventas</h2>
      {isVisible && <Chart key={key} />}
    </div>
  );
};

export default SalesChart;