import { BarLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto 50px auto",
};

const Spinner = ({ color = "blue", size = "150px" }) => {
  return (
    <div>
      <BarLoader
        color={color}
        width={size}
        cssOverride={override}
        aria-label='Loading...'
      />
    </div>
  );
};

export default Spinner;
