import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const BarChartMovements = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='day' angle={-90} textAnchor='end' />
          <YAxis />
          <Tooltip
            formatter={(value) => `$${value}`}
            cursor={{
              fill: '#1e1e2f',
              opacity: 0.6,
            }}
            contentStyle={{
              backgroundColor: '#1e1e2f',
              color: '#fff',
              borderRadius: '5px',
              border: '1px solid #16072e ',
              padding: '10px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Bar dataKey='amount' fill='#8884d8' radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

BarChartMovements.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BarChartMovements;
