import { BsFillHouseFill, BsHouse, BsBarChartFill, BsBarChart, BsPeople, BsPeopleFill } from 'react-icons/bs'

function TabBarItem(props) {
  return (
    <div className="text-xl" onClick={() => props.setActive(props.id)}>
      {props.active === props.id ? props.icon_fill : props.icon}
    </div>
  )
}

function TabBar(props) {
  return (
    <div className="py-4 flex justify-center">
      <div className="bg-white w-44 h-12 rounded-2xl flex flex-wrap justify-between px-8 content-center">
        <TabBarItem id='portfolio' icon_fill={<BsBarChartFill />} icon={<BsBarChart />} active={props.active} setActive={props.setActive} />
        <TabBarItem id='home' icon_fill={<BsFillHouseFill />} icon={<BsHouse />} active={props.active} setActive={props.setActive} />
        <TabBarItem id='people' icon_fill={<BsPeopleFill />} icon={<BsPeople />} active={props.active} setActive={props.setActive} />
      </div>
    </div>
  );
}

export default TabBar;
