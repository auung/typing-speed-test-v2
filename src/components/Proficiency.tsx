import useTypingStatusStore from "../hooks/stores/useTypingStatusStore";

type LayoutProps = {
  title: string,
  value: number
}

const Layout = ({ title, value }: LayoutProps) => {
  return (
    <div className="flex items-end">
      <span className="mr-1">{ title }: </span>
      <span className="text-2xl">{ value }</span>
    </div>
  )
}

const Proficiency = () => {
  const wpm = useTypingStatusStore((state) => state.time);
  const accuracy = useTypingStatusStore((state) => state.accuracy);

  return (
    <div className="flex gap-8">
      <Layout title="WPM" value={wpm} />
      <Layout title="ACC" value={accuracy} />
    </div>
  );
}
 
export default Proficiency;