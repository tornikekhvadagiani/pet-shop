import { Slider } from './components/Slider';
import slides from './images/Images.json'

function App() {
  return (
    <div>
    <Slider slides={slides}/>
    </div>
  )
}

export default App;