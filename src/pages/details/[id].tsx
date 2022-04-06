import { axiosInstance } from '@/helpers/axios';
import { IApi, IUniversity } from '@/helpers/types';
import { Btn, H2 } from '@/styles/common';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Details({ data }: { data: IUniversity }) {
  const router = useRouter();
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
      <Link href={`/uni/edit/${name}`}>Edit</Link>
      <Btn onClick={() => router.back()}>Back</Btn>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id, country } = context.query;
  console.log(country);
  const results: IApi = (await axiosInstance.get(`?country=${country}`)).data;
  const universitiy = results.data.find((result) => result.id == id);
  return {
    props: {
      data: universitiy,
    },
  };
}
