import { useNavigate } from "react-router-dom";
import ButtonLG from "./ButtonLG";

const LoginCallOut = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <h3 className="text-3xl mb-12">Login or Sign Up first.</h3>
            <ButtonLG text={"Login or Sign Up"} customWidth={""} color={"bg-medium-1"} onClick={() => {navigate("/login")}}/>
        </div>
    );
}

export default LoginCallOut;