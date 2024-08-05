import Logo from '../../assets/BoWS_logo.svg';
import User_icon from '../../assets/user_icon.svg'
import {Link} from "react-router-dom";

function Header() {

    return (
        <div className="w-[1280px] h-[100px] mb-5 flex justify-between items-center">
            <Link to="/">
                <img className="h-[50px]" alt="userProfile" src={Logo} />
            </Link>
            <div>
                <div className="border rounded-full overflow-hidden cursor-pointer">
                    <img className="h-[30px] object-cover m-2" alt="userProfile" src={User_icon}/>
                </div>
            </div>
        </div>
    )
}

export default Header;