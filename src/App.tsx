import useInit from './utils/hooks/useInit';
import { Line } from 'react-chartjs-2';
import useLineChart from './utils/hooks/useLineChart';
import './App.css'

function App() {
  const { nextRequestAfter } = useInit();
  const {
    graphoptions,
    graphdata
  } = useLineChart();

  return (
    <>
      <Line 
        options={graphoptions} 
        data={graphdata} 
      />

      <h1 className="text-3xl font-bold my-[40px]">
        Next request after { nextRequestAfter } seconds
      </h1>
    </>
  )
}

export default App
