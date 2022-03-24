import { MdClose } from "react-icons/md";
import LineChart from "./LineChart";
import { getAllData } from '../market'
import { get, roundToTwoDecimals } from '../util'

import tree1 from "../assets/tree1.png";
import tree2 from "../assets/tree2.png";
import tree3 from "../assets/tree3.png";
import tree4 from "../assets/tree4.png";
import { useState } from "react";

import background1 from "../assets/background1.jpg"
import background2 from "../assets/background2.jpg"
import background3 from "../assets/background3.jpg"

const PORTFOLIO_TICKERS = [ 
  // ['AAPL', 4, 115.08, 4, 'tree1'],
  ['DBX', 4, 27.82, 4, 'tree1'],
  // ['TSLA', 4, 485.39, 4, 'tree3'],
  // ['AMZN', 1, 3199.20, 1, 'tree4'],
  ['CMG', 1, 1278.12, 1, 'tree4'],
  // ['GOOG', 3, 1482.21, 3, 'tree2'],
  // ['FVRR', 10, 139.94, 5, 'tree4'],
  // ['MSFT', 4, 210.38, 4, 'tree2'],
  ['MRNA', 4, 75.31, 4, 'tree2'],
  // ['GME', 4, 9.13, 4, 'tree2'],
  // ['ETSY', 10, 184.93, 5, 'tree4'],
  // ['UPWK', 10, 41.68, 6, 'tree4'],
  // ['NVDA', 4, 545.70, 4, 'tree3'],
  ['DAL', 3, 32.64, 3, 'tree2'],
  // ['SPY', 3, 339.76, 3, 'tree2'],
]

const mapTreeToImage = {
  'tree1': <img src={tree1} />,
  'tree2': <img src={tree2} />,
  'tree3': <img src={tree3} />,
  'tree4': <img src={tree4} />,
}

function PortfolioItem(props) {
  return (
    <div className="py-2 flex justify-between" onClick={() => props.setExpanded(props.ticker)}>
      <div className="w-8 p-1.5 flex items-end">
        {mapTreeToImage[props.tree]}
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex flex-wrap items-center">
          <div className="text-xl font-display font-bold text-gray-600">
            {props.ticker}
          </div>
          {!props.isCash && (<div className="mx-1.5 px-1.5 bg-gray-800 rounded-md h-5">
            <div className="text-xs text-white my-0.5">
              {props.shares} {props.shares === 1 ? "share" : "shares"}
            </div>
          </div>)}
        </div>
        <div className="text-xs font-display font-light text-gray-600">
          {props.name}
        </div>
      </div>
      <div className="w-18 flex flex-col items-end">
        <div className="text-lg font-display font-light text-gray-600">
          ${props.price}
        </div>
        {!props.isCash && (<div className={`px-1.5 rounded-md h-5 -m-1 ${props.change >= 0 ? "bg-green-600" : "bg-brown"}`}>
          <div className="text-xs text-white my-0.5">
            {roundToTwoDecimals(props.change)}%
          </div>
        </div>)}
      </div>
    </div>
  )
}

function PortfolioExpandedTitle(props) {
  return (
    <div className="py-2 flex justify-between">
      <div className="w-8 p-1.5 flex items-end">
        {mapTreeToImage[props.tree]}
      </div>
      <div className="flex-grow flex flex-col justify-between">
        <div className="flex flex-wrap items-center">
          <div className="text-xl font-display font-bold text-gray-600">
            {props.ticker}
          </div>
        </div>
        <div className="text-xs font-display font-light text-gray-600 ">
          {props.name}
        </div>
      </div>
      <div className="w-8 flex items-center justify-center" onClick={() => props.setExpanded('')}>
        <div className="text-xl">
          <MdClose />
        </div>
      </div>
    </div>
  )
}

function PortfolioExpandedSubtitle(props) {
  return (
    <div className="w-screen pt-2">
      <p className="text-xl font-display font-bold">{props.text}</p>
    </div>
  );
}

function PortfolioExpandedPositionItem(props) {
  return (
    <div className="w-1/3 py-2">
      <p className="text-xs text-gray-600">{props.title}</p>
      <p className="text-md -my-1">{props.value}</p>
    </div>
  );
}

function PortfolioAnalysisCard(props) {
  return (
    <div className="mt-1 h-20 w-32 mr-2">
      <div className="rounded-lg  h-full w-full bg-gradient-to-t from-gray-500 via-gray-200 to-transparent">
        <div className="h-full w-full rounded-lg flex flex-col" style={{backgroundImage: `url(${props.background})`, backgroundSize: "cover"}}>
          <div className="flex-grow"></div>
          <div className="text-xs text-white px-1 py-1">
            {props.headline}
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioBuySellButton(props) {
  return (
    <div className="pt-2 h-12 flex">
      <div className="w-1/2 pr-2">
        <div className="bg-blue-600 h-12 text-center text-white text-2xl font-bold rounded-xl">
          Buy
        </div>
      </div>
      <div className="w-1/2">
        <div className="bg-gray-600 h-12 text-center text-white text-2xl font-bold rounded-xl">
          Sell
        </div>
      </div>
    </div>
  );
}

function PortfolioItemExpanded(props) {
  var buying_price = 0
  var shares = 0
  var tree = ''
  for (var i = 0; i < PORTFOLIO_TICKERS.length; i++) {
    var ticker = PORTFOLIO_TICKERS[i]
    if (ticker[0] === props.ticker) {
      buying_price = ticker[2]
      shares = ticker[3]
      tree = ticker[4]
    }
  }
  return (
    <div className="overflow-x-hidden">
      <PortfolioExpandedTitle ticker={props.ticker} name={get(props.data[props.ticker], 'name', '')} tree={tree} setExpanded={props.setExpanded} />
      <div>
        <PortfolioExpandedSubtitle text="Position" />
        <div class="flex flex-wrap">
          <PortfolioExpandedPositionItem title="Shares" value={shares} />
          <PortfolioExpandedPositionItem title="Market Value" value={`$${props.data[props.ticker]['price']}`} />
          <PortfolioExpandedPositionItem title="Total Return" value={`$${roundToTwoDecimals((props.data[props.ticker]['price'] - buying_price) * shares)}`} />
          <PortfolioExpandedPositionItem title="Diversity" value={`${roundToTwoDecimals((props.data[props.ticker]['price'] * shares) / 8000 * 100)}%`} />
          <PortfolioExpandedPositionItem title="52 Week High" value={`$${props.data[props.ticker]['high52']}`} />
          <PortfolioExpandedPositionItem title="52 Week Low" value={`$${props.data[props.ticker]['low52']}`} />
          <PortfolioExpandedPositionItem title="Market Cap" value={`${roundToTwoDecimals(props.data[props.ticker]['marketcap'] / 1000000000)}B`} />
          <PortfolioExpandedPositionItem title="Beta" value={props.data[props.ticker]['beta']} />
          <PortfolioExpandedPositionItem title="P/E Ratio" value={props.data[props.ticker]['pe']} />
        </div>
      </div>
      <div>
        <PortfolioExpandedSubtitle text="Analysis" />
        <div className="flex flex-row overflow-x-hidden -mr-64">
          <PortfolioAnalysisCard headline={`The latest market updates for ${props.ticker}.`} background={background1} />
          <PortfolioAnalysisCard headline={`Why ${props.ticker} moved today.`} background={background2} />
          <PortfolioAnalysisCard headline={`This is what our analysts think about ${props.ticker}.`} background={background3} />
        </div>
      </div>
      <div>
        <PortfolioExpandedSubtitle text="Performance" />
        <LineChart
          data={props.data[props.ticker]['history'].split(',').map(value => parseFloat(value))}
        />
      </div>
      <div>
        <PortfolioBuySellButton />
      </div>
    </div>
  )
}

function PortfolioItems(props) {
  return (
    <>
      {PORTFOLIO_TICKERS.map(
        stock => 
          <PortfolioItem 
            key={stock[0]}
            ticker={stock[0]}
            name={get(props.data, stock[0])['name']}
            shares={stock[1]}
            change={(get(props.data, stock[0])['price'] - stock[2]) / stock[2] * 100}
            price={get(props.data, stock[0])['price']}
            tree={stock[4]}
            setExpanded={props.setExpanded}
          />
        )
      }
      <PortfolioItem
        key='cash'
        ticker='Cash'
        name='Purchasing Power'
        price={379.21}
        isCash
        setExpanded={function addStockToPortfolio() {
          var stock = window.prompt("Which stock would you like to add to your portfolio?")
          if (stock === 'SPY') {
            PORTFOLIO_TICKERS.push(['SPY', 0, 411.07, 0, 'tree2'])
          }
        }}
      />
    </>
  )
}

function Portfolio(props) {
  const [ expanded, setExpanded ] = useState('')
  const [ data, setData ] = useState({})
  getAllData().then(response => response.json()).then(data => setData(data))

  return (
    <div className="pb-4 flex justify-center">
      <div className="bg-white w-10/12 h-96 rounded-2xl flex flex-col justify-start px-4 py-2 content-center overflow-y-auto">
        {
          expanded === ''
          ? <PortfolioItems setExpanded={setExpanded} data={data} />
          : <PortfolioItemExpanded ticker={expanded} data={data} setExpanded={setExpanded} />
        }
      </div>
    </div>
  );
}

export default Portfolio;
