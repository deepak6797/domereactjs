interface Props {
  children: React.ReactElement;
}

const Main: React.FC<Props> = ({ children }) => {
  return <div className="px-4">{children}</div>;
};

export default Main;
