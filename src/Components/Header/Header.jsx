import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, userData } from "../../pages/userSlice";



export const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRdxData = useSelector(userData)

    const token = userRdxData?.credentials.token;
    const decoded = userRdxData?.credentials?.userData;

    const logMeOut = () => {
        dispatch(logout({ credentials: {} }));
        setTimeout(() => {
          navigate("/home");
        });
      };



};