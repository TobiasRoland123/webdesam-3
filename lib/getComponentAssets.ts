import { Asset } from '@/types/frontpage';
import { refinedAsset } from '@/types/refinedAssets';

interface getComponentAssetsProps {
  assets?: Array<Asset>;
  assetIds?: Array<string> | string;
}

export default function getComponentAssets({
  assets,
  assetIds,
}: getComponentAssetsProps) {
  if (!assets || !assetIds) {
    throw new Error('missing assets or assetIds');
  }

  const componentAssets = assets?.filter(
    (asset) => asset.sys?.id && assetIds?.includes(asset?.sys?.id)
  );

  const reformattedAssets: Array<refinedAsset> = componentAssets.map(
    (asset) => ({
      url: `https:${asset?.fields?.file?.url}`,
      alt: asset?.fields?.title,
      width: asset?.fields?.file?.details?.image?.width,
      height: asset?.fields?.file?.details?.image?.height,
      sys: asset.sys,
    })
  );

  return reformattedAssets.length > 1
    ? reformattedAssets
    : reformattedAssets[0];
}
