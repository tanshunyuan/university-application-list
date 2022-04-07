import { axiosInstance } from '@/helpers/axios';
import { IUniversity, IApi } from '@/helpers/types';
import { GetServerSidePropsContext } from 'next';
import { UniForm } from '@/components/UniForm';
import Link from 'next/link';
import styled from 'styled-components';

export default function EditUniversity({ data }: { data: IUniversity }) {
  return (
    <$Container>
      <Link href="/">Go Back</Link>
      <UniForm data={data} isEdit={true} />
    </$Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id, country } = context.query;
  const results: IApi = (await axiosInstance.get(`?country=${country}`)).data;
  const universitiy = results.data.find((result) => result.id == id);
  return {
    props: {
      data: universitiy,
    },
  };
}

const $Container = styled.div`
  margin-inline: 2rem;
`;
