import { axiosInstance } from '@/helpers/axios';
import { IUniversity } from '@/helpers/types';
import { H2 } from '@/styles/common';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';

export default function Details({ data }: { data: IUniversity }) {
  const { name, web_pages } = data;
  return (
    <div>
      <H2>{name}</H2>
      {web_pages.map((link, index) => {
        return (
          <a href={link} target="_blank" rel="noreferrer" key={index}>
            {link}
          </a>
        );
      })}
      <Link href="/">Go Back</Link>
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
