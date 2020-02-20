import React from 'react';
import { render } from '@testing-library/react';
import GlobalSearch from './containers/GlobalSearch';

test('renders learn react link', () => {
  const { getByText } = render(<GlobalSearch />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
