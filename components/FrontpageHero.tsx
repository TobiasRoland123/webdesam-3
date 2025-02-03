import Image from 'next/image';
import { Asset } from '@/types/frontpage';
import getSingleComponentAsset from '@/lib/getSingleComponentAsset';

type FrontpageHeroProps = {
  title?: string;
  shortText?: string;
  assetId?: string;
  assets?: Array<Asset>;
};

export default async function FrontpageHero({
  title,
  shortText,
  assetId,
  assets,
}: FrontpageHeroProps) {
  const image = getSingleComponentAsset({
    assets,
    assetId,
  });

  console.log('image from frontpageHero', image);
  return (
    <section className={'m-1 bg-secondary'}>
      {image && image.url && (
        <div>
          <Image
            src={image?.url}
            alt={image?.alt || 'Baggrundsbillede'}
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
