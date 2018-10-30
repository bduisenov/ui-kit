import { styled } from '../utils';

import { ITextProps, Text } from './Text';

export interface IHeadingProps extends ITextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading = styled<IHeadingProps, 'h1'>(Text as any)(
  // @ts-ignore
  {}
);

Heading.defaultProps = {
  as: 'h2',
  m: 0,
  weight: 'bold',
};
