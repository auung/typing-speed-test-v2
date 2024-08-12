import Accuracy from "./Accuracy";
import Reset from "./Reset";
import Speed from "./Speed";
import Timer from "./Timer";

const Top = () => {
  return (
    <div className="">
      <Speed />
      <Accuracy />
      <Timer />
      <Reset />
    </div>
  );
}
 
export default Top;