import { func } from 'ts-interface-checker';
import Asset from '@/types/asset';

function isValidPath(path: string) {
  // Ensure that all parts of the slug are valid
  if (!path) return true;
  return /[^.]/.test(path);
}

export async function fetchContentByTag(slug: string[] = []) {
  const path = slug ? slug.join('/') : '';

  // console.log('fetchUrl',`${process.env.BASEURL}/entries?&metadata.tags.sys.id[all]=${path}`)

  if (!isValidPath(path)) {
    // Ensure we only fetch valid paths. Otherwise, the server will throw an error
    return { data: undefined, response: new Response(null, { status: 404 }) };
  }

  const response = await fetch(
    `${process.env.BASEURL}/entries?&metadata.tags.sys.id[all]=${path}` || '',
    {
      headers: {
        Authorization: `Bearer ${process.env.access_token}`,
      },
    }
  );

  const data = await response.json();

  // console.log('server data', data);

  if (!data || !data.items || data.items.length === 0) {
    return undefined;
  }

  return data;
}

async function fetchAsset(id?: string) {
  const data = await fetch(`${process.env.BASEURL}assets/${id}?` || '', {
    headers: {
      Authorization: `Bearer ${process.env.access_token}`,
    },
  });
  return await data.json();
}

export async function getAssetsById(idList?: string[]) {
  if (!idList) {
    throw new Error('idList missing');
  }

  let assets: any = [];

  for (const id of idList) {
    const asset = await fetchAsset(id);

    const formatedAsset: Asset = {
      url: `https:${asset.fields.file.url}`,
      alt: asset.fields.description,
      width: asset.fields.file.details.image.width,
      height: asset.fields.file.details.image.height,
    };

    assets.push(formatedAsset);
  }
  // If only one asset was fetched, then it will be an object which is not surrounded by an array
  if (assets.length <= 1) assets = assets[0];

  return assets;
}
