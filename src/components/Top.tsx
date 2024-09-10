import Proficiency from "./Proficiency";
import Timer from "./Timer";

const Top = () => {
  return (
    <div className="my-5 flex flex-col gap-4">
      <h1 className="text-4xl font-bold">Typing Speed Test v2</h1>
      <div className="flex justify-between">
        <Proficiency />
        <Timer />
      </div>
    </div>
  );
}
 
export default Top;