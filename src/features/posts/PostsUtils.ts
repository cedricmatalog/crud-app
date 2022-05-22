import IPost from '../../interfaces/IPost';

export type Filter = Record<string, string>;

export function handleFilterChange(
  data: IPost[],
  filter: Filter,
  setSearchResults: (data: IPost[]) => void
) {
  const filterPosts = () => {
    return (
      data?.filter(({ name }) => name.toLowerCase().search(text) !== -1) ?? []
    );
  };

  const { text, active, inactive } = filter;
  let results = [...(data ?? [])];

  if (
    (text === '' && active === 'false' && inactive === 'false') ||
    (text === '' && active === 'true' && inactive === 'true')
  ) {
    setSearchResults(data);
  }

  if (
    (text !== '' && active === 'false' && inactive === 'false') ||
    (text !== '' && active === 'true' && inactive === 'true')
  ) {
    setSearchResults(filterPosts());
  }

  if (
    (text !== '' || text === '') &&
    active === 'true' &&
    inactive === 'false'
  ) {
    results = filterPosts().filter(({ active }) => active);
    setSearchResults(results);
  }

  if (
    (text !== '' || text === '') &&
    active === 'false' &&
    inactive === 'true'
  ) {
    results = filterPosts().filter(({ active }) => !active);
    setSearchResults(results);
  }
}
