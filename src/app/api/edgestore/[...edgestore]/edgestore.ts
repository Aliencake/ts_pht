import { initEdgeStore } from '@edgestore/server';
import { initEdgeStoreClient } from '@edgestore/server/core';

const es = initEdgeStore.create();

export const edgeStoreRouter = es.router({
  Photos: es
    .imageBucket({
      maxSize: 1024 * 1024 * 100,
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      return true;
    }),
  Files: es
    .fileBucket({
      maxSize: 1024 * 1024 * 200,
      accept: ['video/*'],
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      return true;
    }),
});

export type EdgeStoreRouter = typeof edgeStoreRouter;

export const edgeStoreClient = initEdgeStoreClient({
  router: edgeStoreRouter,
  baseUrl: 'api/edgestore',
});
