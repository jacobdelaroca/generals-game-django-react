

function Pieces({ piece }) {
    const [test, settest] = useState(1);
    const { cellClicked } = useContext(MyContext);
    const top = WIDTH * Math.floor(position / 9) * test;
    const left = WIDTH * (position % 9);
    // const top = 0
    // const left = 0
  
    console.log(`Top: ${top}px`);
    console.log(`Left: ${left}px`);
  
    const move = () => {
      console.log("click");
      cellClicked(position, document.getElementById(`piece-${position}`))
    }
  
    return(
      <div
        className="flex items-center justify-center absolute"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          width: `${WIDTH}px`,
          height: `${WIDTH}px`,
        }}
        onClick={ move }
        id={`piece-${position}`}
        onTransitionEnd={() => {}} // add shit here
      >
        <div className="w-6 h-6 rounded-full bg-red-500 piece"></div>
      </div>
    )
  }

  export default Pieces