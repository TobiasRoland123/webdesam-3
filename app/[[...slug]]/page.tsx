import Frontpage from '@/app/pageTypes/Frontpage';
import { notFound } from 'next/navigation';
import { fetchPageWithLinkedItems } from '@/lib/contentful';
type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return [{ slug: [] }];
}

export default async function Page(props: Props) {
  const params = await props.params;
  const searchTag =
    params?.slug && params.slug.length > 0 ? params.slug[0] : 'frontpage';

  // console.log('just params', params);
  // console.log('params.slug', params.slug )
  // console.log('self set params', ['frontpage'] )
  // console.log('searchTag', searchTag);

  const data = await fetchPageWithLinkedItems(searchTag);

  if (!data) notFound();

  switch (searchTag) {
    case 'frontpage':
      return <Frontpage data={data?.includes} />;
    default:
      return <div>testing </div>;
  }
}
