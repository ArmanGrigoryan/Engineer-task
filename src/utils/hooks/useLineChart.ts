import { faker } from '@faker-js/faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useAppSelector } from '../../store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Bitcoin price index Chart',
    },
  },
};

const graphlabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
      });
      chart.update();
    }
  },
];

const graphdata = {
  labels: graphlabels,
  actions,
  datasets: [
    {
      label: 'EUR',
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'USD',
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'GPR',
      borderColor: 'green',
      backgroundColor: 'green',
    },
  ],
};

export default function useLineChart() {
  const { data, prev } = useAppSelector(state => state.currency);
  const [ eur, usd, gpr ] = graphdata.datasets;

  eur.data = graphlabels.map(() => faker.datatype.number({ min: data?.eur?.rate_float, max: data?.eur?.rate_float }));
  usd.data = graphlabels.map(() => faker.datatype.number({ min: data?.usd?.rate_float, max: data?.usd?.rate_float }));
  gpr.data = graphlabels.map(() => faker.datatype.number({ min: data?.gpr?.rate_float, max: data?.gpr?.rate_float }));

  return {
    graphoptions,
    graphdata
  }
}