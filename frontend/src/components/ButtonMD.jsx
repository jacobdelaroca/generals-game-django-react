const ButtonMD = ({ text, color, onClick, isDisabled, customWidth }) => {
    const disabled = isDisabled || false;
    const width = customWidth || false;
    return (
        <button disabled={isDisabled} className={`${(width) ? width : "px-10"} disabled:bg-opacity-50 border text-xl ${color} xl:py-2 my-2 rounded-lg text-white`} onClick={onClick}>{text}</button>
    )
}

export default ButtonMD;