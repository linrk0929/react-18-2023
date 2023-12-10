import { BarChart } from './components/BarChart'


const Home = () => { 
   
    return (  <div>
        <BarChart
         xData={['Vue', 'React', 'Angular']}
            sData={[2000, 5000, 1000]}
            title={'三大框架满意度'}
        ></BarChart>
        <BarChart
          xData={['Vue', 'React', 'Angular']}
          sData={[200, 500, 100]}
            style={{ width: '500px', height: '400px', }}    
            title={'三大框架使用度'}
     ></BarChart>

 </div>)
  
    
  
}
export default Home