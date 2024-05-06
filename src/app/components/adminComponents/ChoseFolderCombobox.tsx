import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { Check, ChevronsUpDown, Loader2, X } from 'lucide-react';
import { Folder } from '@prisma/client';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { toast } from 'sonner';
import axios from 'axios';
import {
  add_category_schema,
  id_schema,
  update_folder_schema,
} from '@/app/types';
import { AddCategoryDialog } from './AddCategoryDialog';

type FolderComboboxProps = {
  category_id: number;
};

export function FolderCombobox(props: FolderComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [folders, setFolders] = React.useState<Folder[]>();

  const queryClient = useQueryClient();

  const AddFolderMutation = useMutation({
    mutationFn: async (form: z.infer<typeof add_category_schema>) => {
      const res = await axios.put('api/folders', form);
      let updatedFolders = folders;
      updatedFolders?.push(res.data);
      setFolders(updatedFolders);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      toast.success('Теку успішно створено');
    },
    onError: (error) => {
      toast.error('Виникла помилка', {
        description: error.message,
      });
    },
  });

  const DeleteFolderMutation = useMutation({
    mutationFn: async (form: z.infer<typeof id_schema>) => {
      const res = await axios.delete('api/folders', { data: form });
      return res.data;
    },
    onMutate: async (form) => {
      await queryClient.cancelQueries({ queryKey: ['folders'] });

      const previousFolders = queryClient.getQueryData(['folders']);

      setFolders(folders?.filter((item) => item.id !== form._id));

      return previousFolders;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
      toast.success('Теку видалено');
    },
    onError: (error) => {
      toast.error('Виникла помилка', {
        description: error.message,
      });
    },
  });

  const UpdateFolderMutation = useMutation({
    mutationFn: async (form: z.infer<typeof update_folder_schema>) => {
      const res = await axios.post('api/folders', { data: form });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] });
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const res = await axios.get('api/folders').then((res) => res.data);
      return res;
    },
    retry: 10,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="ml-2 size-5 animate-spin" />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <h1>Йой, помилка</h1>;
  }

  const handleSelect = (currentValue: string) => {
    const new_folder = currentValue === value ? '' : currentValue;
    const remove_categories = () =>
      data.map((_folder: Folder) => {
        if (_folder.categories.includes(props.category_id)) {
          UpdateFolderMutation.mutate({
            id: _folder.id,
            categories: _folder.categories.filter(
              (number) => number !== props.category_id,
            ),
          });
        }
      });
    setValue(new_folder);

    if (data) {
      const folder = data.find((folder: Folder) => folder.title === new_folder);

      if (folder) {
        UpdateFolderMutation.mutate({
          id: folder.id,
          categories: folder.categories.concat(props.category_id),
        });

        remove_categories();
      } else {
        remove_categories();
      }
    }
  };

  if (!folders) {
    setFolders(data);
    data.map((folder: Folder) => {
      if (folder.categories.includes(props.category_id)) {
        setValue(folder.title);
      }
    });
  } else {
    if (data !== folders) {
      setFolders(data);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-28"
        >
          <p className="truncate">
            {folders && value
              ? folders.find((folder) => folder.title === value)?.title
              : 'Вибрати теку...'}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Пошук теки..." />
          <CommandEmpty>Не знайдено жодної теки.</CommandEmpty>
          <CommandList>
            {folders
              ? folders.map((folder) => (
                  <CommandItem
                    key={folder.id}
                    value={folder.title}
                    onSelect={(currentValue) => {
                      setOpen(false);
                      handleSelect(currentValue);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 size-4',
                        value === folder.title ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <p className="truncate w-3/4">{folder.title}</p>
                    <X
                      className="right-0 size-4"
                      onClick={() => {
                        DeleteFolderMutation.mutate({
                          _id: folder.id,
                        });
                      }}
                    />
                  </CommandItem>
                ))
              : null}
          </CommandList>
          <div className="flex justify-center my-2 ">
            <AddCategoryDialog mutation={AddFolderMutation} name="теку" />
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
