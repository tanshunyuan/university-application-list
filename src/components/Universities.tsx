import { IUniversity } from '@/helpers/types';
import { H2 } from '@/styles/common';
import { Card } from './Card';
type IUniversitiesProps = {
  universities: IUniversity[];
  country: string;
};
export const Universities = ({ universities, country }: IUniversitiesProps) => {
  return (
    <>
      <H2>{country}</H2>
      {universities.length == 0 ? (
        <p>There is nothing</p>
      ) : (
        universities.map((uni, index: number) => {
          return (
            <Card
              key={index}
              name={uni.name}
              id={uni.id}
              country={uni.country}
            />
          );
        })
      )}
    </>
  );
};
