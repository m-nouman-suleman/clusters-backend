function generateMetricArray  (numPoints) {
  const iopsArray = [];
  const throughputArray = [];

  for (let i = 0; i < numPoints; i++) {
    // Randomly generate IOPS and throughput values
    const iopsValue = Math.floor(Math.random() * 5000) + 1000;
    const throughputValue = Math.floor(Math.random() * 1000) + 1000;

    iopsArray.push(iopsValue);
    throughputArray.push(throughputValue);
  }

  return { iops: iopsArray, throughput: throughputArray };
};
module.exports = { generateMetricArray };