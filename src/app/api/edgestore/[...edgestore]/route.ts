import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { z } from 'zod';
 
const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    Photos: es
    .imageBucket({
      maxSize: 1024 * 1024 * 100,
    })
    .beforeDelete(({ ctx, fileInfo }) => {
      console.log('beforeDelete', ctx, fileInfo);
      return true; // allow delete
    }),
    Files: es.fileBucket({
        maxSize: 1024 * 1024 * 200,
        accept: ['video/*'],
    })    
    .beforeDelete(({ ctx, fileInfo }) => {
      console.log('beforeDelete', ctx, fileInfo);
      return true; // allow delete
    }),
});
 
const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});
 
export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;