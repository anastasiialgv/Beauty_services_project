import Header from "../../components/Header/Header.jsx";
import Beauty_lesson from "../../assets/images/Beauty_lesson.png";
import Makeup from "../../assets/images/Make_up.png";
import Skin from "../../assets/images/Skin_Analysis.png";
import Waxing from "../../assets/images/Waxing.png";
import Block from "../../components/Block.jsx";

export default function Home() {
  const elements = [
    {
      reverse: false,
      img: Makeup,
      name: "Makeup",
      price: "200 PLN",
      text: "Get a complete look with this custom-tailored service that gives your favorite feature extra attention.",
    },
    {
      reverse: true,
      img: Beauty_lesson,
      name: "Beauty lesson",
      price: "300 PLN",
      text: "Get personalized tips and tricks during this guided tutorial - then take away the skills to do it yourself at home.",
    },
    {
      reverse: false,
      img: Waxing,
      name: "Waxing",
      price: "400 PLN",
      text: "Custom brow-mapping and shaping, plus upper-lip and chin wax",
    },
    {
      reverse: true,
      img: Skin,
      name: "Skin Analysis",
      price: "150 PLN",
      text: "You don't know what type of care will be best for your skin? In 15 minutes you will check the needs of your skin and learn about the products that suit you.",
    },
  ];
  return (
    <div>
      <Header />
      <div className="container">
        {elements.map((value, index) => (
          <Block
            key={index}
            name={value.name}
            price={value.price}
            text={value.text}
            reverse={value.reverse}
            img={value.img}
          />
        ))}
      </div>
    </div>
  );
}
