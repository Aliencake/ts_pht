'use client';

import { add_media_schema } from '@/app/types';
import { Type } from '@prisma/client';
import { MultiFileDropzone, type FileState } from '../MultiFileDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { UseMutationResult } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';

type MultiFileDropzoneUsageProps = {
  mutation: UseMutationResult<
    any,
    Error,
    z.infer<typeof add_media_schema>,
    unknown
  >;
  categoryId: number;
};

export function MultiFileDropzoneUsage(props: MultiFileDropzoneUsageProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                if (addedFileState.file.type.startsWith('image')) {
                  const res = await edgestore.Photos.upload({
                    file: addedFileState.file,
                    onProgressChange: async (progress: number) => {
                      updateFileProgress(addedFileState.key, progress);
                      if (progress === 100) {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 500),
                        );
                        updateFileProgress(addedFileState.key, 'COMPLETE');
                      }
                    },
                  });
                  if (res) {
                    const media = {
                      href: res.url,
                      type: Type.PHOTO,
                      categoryid: props.categoryId,
                      thumbnail: res.thumbnailUrl
                        ? res.thumbnailUrl
                        : undefined,
                    };
                    props.mutation.mutate(media);
                  }
                } else if (addedFileState.file.type.startsWith('video')) {
                  const res = await edgestore.Files.upload({
                    file: addedFileState.file,
                    onProgressChange: async (progress: number) => {
                      updateFileProgress(addedFileState.key, progress);
                      if (progress === 100) {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 500),
                        );
                        updateFileProgress(addedFileState.key, 'COMPLETE');
                      }
                    },
                  });
                  if (res) {
                    const media = {
                      href: res.url,
                      type: Type.VIDEO,
                      categoryid: props.categoryId,
                      thumbnail: undefined,
                    };
                    props.mutation.mutate(media);
                  }
                } else {
                  console.log('this is file i will not accept it');
                }
              } catch (err) {
                updateFileProgress(addedFileState.key, 'ERROR');
              }
            }),
          );
        }}
      />
    </div>
  );
}
