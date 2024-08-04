// components/Heatmap.js

const calculateDistance = (point1, point2) => {
  return Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );
};

const calculateWeights = (data) => {
  return data.map((point) => {
    let count = 0;
    data.forEach((otherPoint) => {
      if (calculateDistance(point, otherPoint) <= 20) {
        count++;
      }
    });
    return { ...point, weight: count / data.length };
  });
};

const interpolateColor = (weight) => {
  const r = Math.floor(255 * Math.pow(weight, 0.2)); // Increase red component even more aggressively
  const g = 0;
  const b = Math.floor(255 * Math.pow(1 - weight, 3)); // Reduce blue component even more aggressively
  return `rgb(${r},${g},${b})`;
};

const Heatmap = ({ data }) => {
  data = data.prediction;
  const weightedData = calculateWeights(data);

  return (
    <div>
      {weightedData.map((point, index) => {
        const size = 80 + point.weight * 40; // Base size 40, increase with weight
        const color = interpolateColor(point.weight);
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: point.x,
              top: point.y,
              width: size,
              height: size,
              backgroundColor: color,
              borderRadius: "100%",
              opacity: 0.4 + 0.7 * point.weight, // Fixed opacity at 70%
              border: "10px solid neonpink", // Neon pink outline
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Heatmap;
