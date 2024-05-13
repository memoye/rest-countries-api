export function formatNumber(number: number) {
  return number.toLocaleString();
}

export function deserializeQueryParams(
  params:
    | Record<string | number | symbol, string | number | boolean>
    | undefined
) {
  if (!params) return null;

  const queryParams = Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

  return queryParams;
}
