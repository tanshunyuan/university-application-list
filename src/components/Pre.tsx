export const Pre = ({ item }: { item: any }) => {
  return <pre>{JSON.stringify(item, null, 2)}</pre>;
};
