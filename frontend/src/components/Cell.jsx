function Cell({position}) {

    const color = (position % 2 === 0) ? "bg-slate-50" : "bg-slate-700";
    return (
        <>
        <div className={`${color} hover:bg-green-300`} onClick={() => {console.log("click under")}}>{position}
        <h1 className="text-xl">{(name === null)? "none": name}</h1>
        </div>
        </>
    )
}

export default Cell
