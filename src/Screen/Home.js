import { useEffect, useState } from "react";
import ProductCard from "../Component/ProductCard";
import Loader from "./Loader";
import apiHelper from "../Common/ApiHelper";
import ErrorMessage from "./ErrorMessage";

const Home = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({ message: "", type: "" });

  const GetProducts = async () => {
    try {
      setisLoading(true);
      const result = await apiHelper.fetchProducts();
      if (result.status === 200) {
        setProduct(result.data.products);
      }
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      if (error.response && error.response.data.message) {
        setError({
          ...error,
          message: error.response.data.message,
          type: "danger",
        });
       
      }
    }
  };
  useEffect(() => {
    GetProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "35rem" }}>
      <ErrorMessage error={error} setError={setError}/>

      <Loader isLoading={isLoading} />
      <h3 className="mb-2 fw-bold text-primary ">Future Products</h3>
      <div className="row d-flex p-3  justify-content-evenly ">
        {product &&
          product.map((data) => {
            return <ProductCard key={data._id} product={data} />;
          })}
      </div>
    </div>
  );
};

export default Home;
