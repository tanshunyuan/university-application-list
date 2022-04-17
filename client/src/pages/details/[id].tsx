import { axiosInstance } from '@/helpers/axios';
import { IApi, IUniversity } from '@/helpers/types';
import { Btn, H2 } from '@/styles/common';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function Details({ data }: { data: IUniversity }) {
  const router = useRouter();
  const { name, web_pages, country, _id } = data;
  return (
    <$Container>
      {Object.entries(data).length < 1 ? (
        <H2>There has been some error</H2>
      ) : (
        <>
          <H2>{name}</H2>
          <$Body>
            {web_pages.map((link, index) => {
              return (
                <a href={link} target="_blank" rel="noreferrer" key={index}>
                  {link}
                </a>
              );
            })}
            <Link href={{ pathname: `/uni/edit/${_id}`, query: { country } }}>
              Edit
            </Link>
          </$Body>
        </>
      )}
      <div>
        <Btn onClick={() => router.back()}>Back</Btn>
      </div>
    </$Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id, country, page, limit } = context.query;
  const results: IApi = (
    await axiosInstance.get(`?country=${country}&page=${page}&limit=${limit}`)
  ).data;
  const universitiy =
    results.data.length > 0
      ? results.data.find((result) => result._id == id)
      : {};
  return {
    props: {
      data: universitiy,
    },
  };
}

const $Container = styled.div`
  margin-inline: 2rem;
`;
const $Body = styled.div`
  display: flex;
  flex-direction: column;
`;
