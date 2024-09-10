import githubMark from "../assets/github-mark.svg";

const Bottom = () => {
  return (
    <div className="flex flex-col my-4 items-center">
      <p className="text-sm text-center my-3">It may take some time to load the test paragraph. If the application isn't working, please send me an <a className="text-blue-600 visited:text-purple-600 underline" href="mailto:akkyaw798.dev@gmail.com?subject=Typing Speed Test website is broken">email</a>.</p>
      <a href="#" className="block w-8 h-8">
        <img src={githubMark} alt="github-mark" className="w-full" />
      </a>
    </div>
  );
}
 
export default Bottom;