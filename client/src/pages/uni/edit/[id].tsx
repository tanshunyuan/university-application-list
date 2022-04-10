import { axiosInstance } from '@/helpers/axios';
import { IUniversity, IApi } from '@/helpers/types';
import { GetServerSidePropsContext } from 'next';
import { UniForm } from '@/components/UniForm';
import styled from 'styled-components';
import { Btn } from '@/styles/common';
import { useRouter } from 'next/router';

export default function EditUniversity({ data }: { data: IUniversity }) {
  const router = useRouter();
  return (
    <$Container>
      <Btn onClick={() => router.back()}>Back</Btn>
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
