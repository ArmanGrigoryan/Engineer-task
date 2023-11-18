import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
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
  tooltips: {
    mode: 'index'
  },
  scales: {
    y: {
      min: -.1,
      max: 20,
    },
    x: {
      Tooltip: "index"
    }
  }
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const colors = ["red", "green", "yellow", "blue", "gray", "lightblue", "orange", "black", "purple", "green", "brown", "pink", ];

export default function useLineChart() {
  return {
    options,
    months,
    colors,
  }
}