export const appsRelations = {
  teams: {
    masterAccess: '*',
    listAllAccess: 'list-all',
    addAccess: 'add',
    editAccess: 'update',
    deleteAccess: 'delete',
  },
  workers: {
    masterAccess: '*',
    listAllAccess: 'list-all',
    addAccess: 'add',
    editAccess: 'update',
    deleteAccess: 'delete',
    listWorkerAccess: 'worker-access',
  },
  events: {
    masterAccess: '*',
    listAllAccess: 'list-all',
    addAccess: 'add',
    editAccess: 'update',
    deleteAccess: 'delete',
    listWorkerAccess: 'worker-events',
  },
  attendance: {
    masterAccess: '*',
    listAllAccess: 'list-all',
    editAccess: 'update',
    deleteAccess: 'delete',
    markAttAccess: 'mark-att',
    listWorkerAccess: 'worker-att',
  },
};
