import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { formatFileSize } from '@edgestore/react/utils';
import { Progress } from '../ui/progress';

export default function MemoryBage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['sizes'],
    queryFn: async () => {
      const res = await axios.get('api/media/sizes').then((res) => res.data);
      return res;
    },
    retry: 5,
  });

  if (isLoading) {
    return <Loader2 className="animate-spin" color="#000000" />;
  }

  if (error) {
    console.log(error);
    return <h1>Сталася помилка, натисни F12 щоб переглянути.</h1>;
  }

  const percentage_left = (data / 1500000000) * 100;

  return (
    <div className=" text-sm flex flex-col items-center max-w-32">
      {formatFileSize(data)} / 1.5 GB
      <Progress className=" h-2" value={percentage_left} />
    </div>
  );
}
