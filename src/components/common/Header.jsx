import Logo from '../../assets/BoWS_logo.svg';
import {Link} from "react-router-dom";
import ProfileToggle from "./ProfileToggle.jsx";

function Header() {

    return (
        <div className="w-[1280px] h-[100px] mb-5 flex justify-between items-center">
            <Link to="/">
                <img className="h-[50px]" alt="logo" src={Logo} />
            </Link>
            <ProfileToggle />
        </div>
    );
}

export default Header;