import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <>
      <div className="text-center m-5 d-flex justify-content-center gap-3 align-items-center">
        <Spinner className="" color="primary"></Spinner>
        <p className="m-0 fs-5">Loading...</p>
      </div>
    </>
  );
};

export default Loading;
