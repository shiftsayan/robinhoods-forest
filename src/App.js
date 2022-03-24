import Title from "./components/Title";
import TabBar from "./components/TabBar";
import Portfolio from "./components/Portfolio";
import Forest from "./components/Forest";

import { useState } from "react";

function App() {
  const [active, setActive] = useState('home');

  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col justify-between overflow-y-hidden">
      <div>
        <Title text="My Forest" />
      </div>
      <div>
        <Forest />
      </div>
      <div>
        { (active !== 'portfolio') 
          ? <TabBar active={active} setActive={setActive}/>
          : <Portfolio />
        }
      </div>
    </div>
  );
}

export default App;
