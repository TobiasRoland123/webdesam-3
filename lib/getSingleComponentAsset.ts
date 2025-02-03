import { Asset } from '@/types/frontpage';
import { refinedAsset } from '@/types/refinedAssets';

interface getComponentAssetsProps {
  assets?: Array<Asset>;
  assetId?: string;
}

export default function getSingleComponentAsset({
  assets,
  assetId,
}: getComponentAssetsProps) {
  if (!assets || !assetId) {
    throw new Error('missing assets or assetId');
  }

  const componentAssets = assets.find((asset) => asset.sys?.id === assetId);

  const reformattedAsset: refinedAsset = {
    url: `https:${componentAssets?.fields?.file?.url}`,
    alt: componentAssets?.fields?.title,
    width: componentAssets?.fields?.file?.details?.image?.width,
    height: componentAssets?.fields?.file?.details?.image?.height,
  };

  return reformattedAsset;
}
