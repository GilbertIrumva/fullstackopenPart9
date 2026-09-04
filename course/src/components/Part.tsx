import type { CoursePart } from "../App";

interface PartProps {
  coursePart: CoursePart;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </p>
          <p>
            <em>{coursePart.description}</em>
          </p>
        </div>
      );

    case "group":
      return (
        <div>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </p>
          <p>
            project exercises {coursePart.groupProjectCount}
          </p>
        </div>
      );

    case "background":
      return (
        <div>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </p>
          <p>
            <em>{coursePart.description}</em>
          </p>
          <p>
            submit to {coursePart.backgroundMaterial}
          </p>
        </div>
      );

    case "special":
      return (
        <div>
          <p>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </p>
          <p>
            <em>{coursePart.description}</em>
          </p>
          <p>
            required skills: {coursePart.requirements.join(", ")}
          </p>
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

export default Part;