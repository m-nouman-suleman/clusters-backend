const Cluster = require('../Models/Cluster');

class ClusterController {
  async getMetrics({ params, response }) {
    try {
      // Finding the cluster using the uuid
      const cluster = await Cluster.findOne({ uuid: params.id });
      if (!cluster) {
        return response.status(404).json({ message: 'Cluster not found' });
      }

      // Returning the cluster metrics as a JSON response
      return response.status(200).json({ metrics: cluster.metrics });
    } catch (error) {
      // Handling errors gracefully and logging for debugging
      console.error('Error fetching cluster metrics:', error);
      return response.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
}

module.exports = new ClusterController();
