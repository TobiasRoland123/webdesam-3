import Frontpage from '@/app/pageTypes/Frontpage';
import { fetchContentByTag } from '@/lib/contentful';
import { notFound } from 'next/navigation';
type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateStaticParams() {
  return [{ slug: [] }];
}

export default async function Page(props: Props) {
  const params = await props.params;
  const searchTag =
    params?.slug && params.slug.length > 0 ? params.slug : ['frontpage'];

  // console.log('just params', params);
  // console.log('params.slug', params.slug )
  // console.log('self set params', ['frontpage'] )
  // console.log('searchTag', searchTag )

  const data = await fetchContentByTag(searchTag);

  if (!data) notFound();

  // console.log('data testing', data.items);

  switch (searchTag[0]) {
    case 'frontpage':
      return <Frontpage data={data.items} />;
    default:
      return <div>testing </div>;
  }
}
