const HRDivider = ({width, my}) => {
    const mY = my || "";
    return <hr className={`${mY}`} style={{width:width, border: 0, height:"1px", background: "#777777"}}/>
    // return <hr style={{width:width, border: 0, height:"1px", backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))"}}/>
}

export default HRDivider