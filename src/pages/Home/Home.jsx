import {useNavigate} from "react-router-dom";

import Header from "../../components/Header/Header.jsx";
import Beauty_lesson from "../../assets/images/Beauty_lesson.png";
import Makeup from "../../assets/images/Make_up.png";
import Skin from "../../assets/images/Skin_Analysis.png";
import Waxing from "../../assets/images/Waxing.png";
export default function Home(){
    const navigate = useNavigate();
    const elements = [
        {reverse: false, img: Makeup, name: "Makeup",price: "200 PLN", text: "Get a complete look with this custom-tailored service that gives your favorite feature extra attention."},
        {reverse: true, img: Beauty_lesson, name: "Beauty lesson",price: "300 PLN", text: "Get personalized tips and tricks during this guided tutorial - then take away the skills to do it yourself at home."},
        {reverse: false, img: Waxing, name: "Waxing",price: "400 PLN", text: "Custom brow-mapping and shaping, plus upper-lip and chin wax"},
        {reverse: true, img: Skin, name: "Skin Analysis",price: "150 PLN", text: "You don't know what type of care will be best for your skin? In 15 minutes you will check the needs of your skin and learn about the products that suit you."},
    ]
    return (
        <div>
        <Header/>
            <div className="container">
            {elements.map((value, index) =>
                <div key={index} className={`row align-items-center mb-4  ${
                    value.reverse ? 'flex-row-reverse' : ''
                }`}>
                    <div className="col-6 text-center px-3">
                        <img src={value.img} className={"img-fluid rounded "} alt="zdjecie"/>
                    </div>
                    <div className="col-6 px-3">
                        <p className="text-bg-black fs-3">{value.name}</p>
                        <p className="text-secondary fs-4">{value.price}</p>
                        <p className="text-secondary fs-4">{value.text}</p>
                        <button className="btn btn-dark mt-3 w-100" onClick={() => navigate("/spotkanie")}>
                            Book an Appointment
                        </button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}