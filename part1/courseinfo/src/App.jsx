const Header = (props) => {
  console.log(props.course[0].courseName);

  return (
    <div>
      <h1>Name of the course : {props.course[0].courseName}</h1>
    </div>
  );
};
const Parts = (props) => {
  return (
    <div>
      <p>
        Topic : {props.partName} Exercises : {props.exerciseCount}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Parts
        partName={props.allParts[0].parts[0]}
        exerciseCount={props.allParts[0].exercises[0]}
      />
      <Parts
        partName={props.allParts[0].parts[1]}
        exerciseCount={props.allParts[0].exercises[1]}
      />
      <Parts
        partName={props.allParts[0].parts[2]}
        exerciseCount={props.allParts[0].exercises[2]}
      />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Total Number of Exercises :{" "}
        {props.parts[0].exercises[0] +
          props.parts[0].exercises[1] +
          props.parts[0].exercises[2]}
      </p>
    </div>
  );
};

const App = () => {
  //Object Array consisting of part and exercise count
  const parts = [
    {
      courseName: "Half Stack application development",
      parts: [
        "Fundamentals of React",
        "Using props to pass data",
        "State of a component",
      ],
      exercises: [10, 7, 14],
    },
  ];

  return (
    <div>
      <Header course={parts} />
      <Content allParts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
