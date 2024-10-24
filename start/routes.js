'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

console.log('Loading routes...');

Route.on('/').render('welcome')

// Group routes for clusters without any middleware for testing
Route.group(() => {
  Route.get('/clusters/:id/metrics', 'ClusterController.getMetrics')
  Route.get('/clusters/:id/snapshot-policy', 'SnapshotController.getPolicy')
  Route.put('/clusters/:id/snapshot-policy', 'SnapshotController.updatePolicy')
})
  .prefix('/api')
  .formats(['json'])