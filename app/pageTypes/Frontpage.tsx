import { notFound } from 'next/navigation';
import FrontpageHero from '@/components/FrontpageHero';
import { Entry, Includes } from '@/types/frontpage';

type FrontpageProps = {
  data?: Includes;
};

export default function Frontpage({ data }: FrontpageProps) {
  if (!data) notFound();

  const assets = data.Asset;

  return (
    <main>
      {data?.Entry?.map((item: Entry) => {
        const moduleType = item?.sys?.contentType?.sys?.id;

        switch (moduleType) {
          case 'homepageHero':
            return (
              <FrontpageHero
                key={'homepageHero'}
                title={item?.fields?.title}
                shortText={item?.fields?.shortText}
                assetId={item?.fields?.image?.sys?.id}
                assets={assets}
              />
            );
          default:
            return undefined;
        }
      })}
    </main>
  );
}
