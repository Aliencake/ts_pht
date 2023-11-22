'use client';
 
import { type EdgeStoreRouter } from '../app/api/edgestore/[...edgestore]/edgestore';
import { createEdgeStoreProvider } from '@edgestore/react';
 
const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>({
    maxConcurrentUploads: 3,
  });
 
export { EdgeStoreProvider, useEdgeStore };