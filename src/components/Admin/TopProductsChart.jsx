import React from "react";
import ReactApexChart from "react-apexcharts";
import { useGetProductsQuery } from "../../redux/api/productsApi/productsApi";

const TopProductsChart = () => {
  const { data: products } = useGetProductsQuery({ limit: 100, skip: 0 });

  // Prepare data only if products exist
  const chartData = React.useMemo(() => {
    if (!products?.products) return { categories: [], series: [] };

    // Sort products by stock in descending order
    const sortedProducts = [...products.products].sort(
      (a, b) => b.stock - a.stock
    );

    // Select the top 10 products
    const topProducts = sortedProducts.slice(0, 10);

    // Extract categories (product names) and series (stock values)
    const categories = topProducts.map((product) => product.title);
    const series = topProducts.map((product) => product.stock);

    return { categories, series };
  }, [products]);

  // Chart configuration
  const options = {
    chart: {
      type: "bar", // Change to "line" if you prefer a line chart
      height: 400,
    },
    xaxis: {
      categories: chartData.categories, // Product names for X-axis
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "center", // top, center, bottom
        },
      },
    },

    title: {
      text: "Top 10 most selling products ",
      align: "center",
    },
    dataLabels: {
      enabled: true, // Show stock values on the bars/points
    },
  };

  return (
    <div>
      {chartData.series.length > 0 ? (
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Sell",
              data: chartData.series, // Stock values for Y-axis
            },
          ]}
          type="bar" // Change to "line" if preferred
          height={500}
        />
      ) : (
        <p>No products available to display.</p>
      )}
    </div>
  );
};

export default TopProductsChart;
