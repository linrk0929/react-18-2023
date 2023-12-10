import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChart = ({ xData, sData, style = {width:'400px',height:'300px'},title }) => { 
    const chartRef = useRef(null)
    useEffect(() => { 
        const myChart = echarts.init(chartRef.current)
        const option = {
            title: {
              text: title
            },
      xAxis: {
        type: 'category',
        data: ['Vue','React','Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10,40,70],
          type: 'bar'
        }
      ]
        }
        myChart.setOption(option)
    }, [sData, xData,title])
    return  <div ref={chartRef} style={style}>this is home</div>
}

export { BarChart}