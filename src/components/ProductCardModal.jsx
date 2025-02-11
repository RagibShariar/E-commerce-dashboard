import { useGetProductByIdQuery } from "../redux/api/productsApi/productsApi";

// eslint-disable-next-line react/prop-types
const ProductCardModal = ({ product, handleCloseModal }) => {
  const { data, isLoading } = useGetProductByIdQuery(product);

  return (
    <div className="w-50 bg-white border p-3 rounded shadow position-absolute z-50 top-50 start-50 translate-middle">
      {isLoading ? (
        <p>Loading... </p>
      ) : (
        <div>
          <h3>{data?.title}</h3>
          <p>{data?.description}</p>
        </div>
      )}

      <button className="btn btn-primary" onClick={handleCloseModal}>
        Close
      </button>
    </div>
  );
};

export default ProductCardModal;
