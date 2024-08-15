import Proficiency from "./Proficiency";
import Reset from "./Reset";
import Timer from "./Timer";

const Top = () => {
  return (
    <div className="flex">
      <Proficiency />
      <Timer />
      <Reset />
    </div>
  );
}
 
export default Top;