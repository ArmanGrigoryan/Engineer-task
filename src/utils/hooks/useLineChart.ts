import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const graphoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Analytics Per Month Created By Users',
    },
  },
};

const barlabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const colors = ["red", "green", "yellow", "blue", "gray", "lightblue", "orange", "black", "purple", "green", "brown", "pink", ];
const barData = {
  labels: barlabels,
  datasets: barlabels.map((each, idx) => ({
    id: idx+1,
    label: each,
    data: [Math.random()],
    backgroundColor: colors[idx],
    borderColor: colors[idx],
  })),
};

export default function useLineChart() {
  return {
    graphoptions,
    barlabels,
    barData,
    colors,
  }
}