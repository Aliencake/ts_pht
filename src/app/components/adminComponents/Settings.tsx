import { update_settings_schema } from '@/app/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function Settings() {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: async () => {
      const res = await axios
        .get('api/settings/autoplay')
        .then((res) => res.data);
      return res;
    },
    staleTime: Infinity,
    retry: 5,
  });

  const UpdateSettingsMutation = useMutation({
    mutationFn: async (form: z.infer<typeof update_settings_schema>) => {
      const res = await axios.post('api/settings/autoplay', form);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
      toast.success('Дані оновлено');
    },
    onError: (error) => {
      toast.error('Дані не успішно не оновлено', {
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof update_settings_schema>>({
    resolver: zodResolver(update_settings_schema),
  });

  useEffect(() => {
    if (data?.autoPlayDelay) {
      form.setValue('delay', data.autoPlayDelay);
    } else {
      form.setValue('delay', 0);
    }
  }, [form, data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="ml-2 size-5 animate-spin" />
      </div>
    );
  }

  if (error) {
    console.log(error);
    return <div>Йойки помилка</div>;
  }

  function onSubmit(values: z.infer<typeof update_settings_schema>) {
    UpdateSettingsMutation.mutate(values);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-screen items-center space-y-6"
        >
          <FormField
            control={form.control}
            name="delay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Швидкість перегортання</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="col-span-3 w-max"
                    {...field}
                  />
                </FormControl>

                <FormDescription>
                  Час в секундах, для автоматичного перегортання
                  <br />0 - вимкнути автоматичне перегортання
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Зберегти</Button>
        </form>
      </Form>
    </div>
  );
}
