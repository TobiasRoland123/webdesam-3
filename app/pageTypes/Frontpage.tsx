import { notFound } from 'next/navigation';
import FrontpageHero from '@/components/FrontpageHero';

type FrontpageProps = {
  data?: any;
};

export default function Frontpage({ data }: FrontpageProps) {
  if (!data) notFound();

  // console.log('data', data);

  return (
    <main>
      {data.map((item) => {
        const moduleType = item.sys.contentType.sys.id;

        switch (moduleType) {
          case 'homepageHero':
            return (
              <FrontpageHero
                key={'homepageHero'}
                title={item.fields.title}
                shortText={item.fields.shortText}
                assetId={item.fields.image.sys.id}
              />
            );
          default:
            return undefined;
        }
      })}
    </main>
  );
}
