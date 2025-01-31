import Image from 'next/image';
import { getAssetsById } from '@/lib/contentful';
import { Asset } from '@/types/asset';

type FrontpageHeroProps = {
  title?: string;
  shortText?: string;
  assetId?: string;
};

export default async function FrontpageHero({
  title,
  shortText,
  assetId,
}: FrontpageHeroProps) {
  const image: Asset = await getAssetsById(assetId ? [assetId] : undefined);

  console.log('image from frontpageHero', image);
  return (
    <section className={'m-1 bg-secondary'}>
      {image && (
        <div>
          <Image
            src={image?.url}
            alt={image?.alt}
            className={'object-cover'}
            width={image?.width}
            height={image?.height}
            priority
          />
        </div>
      )}

      <div>
        {title && <h1>{title}</h1>}
        {shortText && <p>{shortText}</p>}
      </div>
    </section>
  );
}
