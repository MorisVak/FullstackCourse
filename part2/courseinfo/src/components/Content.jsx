import Part from "./Part";
const Content = ({ parts }) => {
  //callback function (sum,part) 0 --> initial value so it's a number
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
      <h4>Total Exercises : {total}</h4>
    </div>
  );
};

export default Content;
