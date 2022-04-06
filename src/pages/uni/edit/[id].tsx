import { axiosInstance } from '@/helpers/axios';
import { IUniversity } from '@/helpers/types';
import { GetServerSidePropsContext } from 'next';
import { UniForm } from '@/components/UniForm';
import Link from 'next/link';

export default function EditUniversity({ data }: { data: IUniversity }) {
  return (
    <div>
      <Link href="/">Go Back</Link>
      <UniForm data={data} isEdit={true} />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const universityName = context.query.id;
  const results: IUniversity[] = (
    await axiosInstance.get(`/search?name=${universityName}`)
  ).data;
  return {
    props: {
      data: results[0],
    },
  };
}
