const Snapshot = require('../../Models/Snapshot');

class SnapshotController {
  async getPolicy({ params, response }) {
    try {
      // Finding the snapshot using the uuid
      const snapshot = await Snapshot.findOne({ id: params.id });
      if (!snapshot) {
        return response.status(404).json({ message: 'Snapshot policy not found' });
      }

      // Returning the snapshot policy details as a JSON response
      return response.status(200).json(snapshot);
    } catch (error) {
      console.error('Error fetching snapshot policy:', error);
      return response.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  async updatePolicy({ params, request, response }) {
    try {
      // Finding the snapshot using the uuid
      const snapshot = await Snapshot.findOne({ id: params.id });
      if (!snapshot) {
        return response.status(404).json({ message: 'Snapshot policy not found' });
      }

      // Getting the payload data
      const data = request.only([
        'policyName',
        'directory',
        'scheduleType',
        'time',
        'days',
        'deleteAfter',
        'locked',
        'enabled'
      ]);

      // Dynamically update only fields that exist in the payload
      Object.keys(data).forEach((key) => {
        if (data[key] !== undefined) {
          snapshot[key] = data[key];
        }
      });

      // Save the updated snapshot
      await snapshot.save();

      return response.status(200).json({ message: 'Snapshot policy updated successfully', snapshot });
    } catch (error) {
      console.error('Error updating snapshot policy:', error);
      return response.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
}

module.exports = new SnapshotController();
