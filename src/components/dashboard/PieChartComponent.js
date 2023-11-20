import React from "react";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";

const PieChartComponent = ({ data, title, height }) => (
  <div className="card mb-3">
    <div className="card-header">{title}</div>
    <div className="card-body">
      <Pie
        data={data}
        options={{ maintainAspectRatio: false }}
        style={{ height }}
      />
    </div>
  </div>
);

PieChartComponent.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
};

PieChartComponent.defaultProps = {
  height: "300px",
};

export default PieChartComponent;
