import { TailSpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <TailSpin
      height="40"
      width="40"
      color="#1976d2"
      ariaLabel="tail-spin-loading"
      radius="5"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
