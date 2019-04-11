/* @jsx jsx */
import { jsx } from '@emotion/core';
import * as React from 'react';

import { TabList, TabListProps } from 'react-tabs';
import { IBoxCSS } from '../Box';

const StyledTabList: React.FunctionComponent<TabListProps> & { tabsRole: string } = props => {
  const { children, ref, ...rest } = props;

  return (
    <TabList {...rest} css={tabListStyle}>
      {children}
    </TabList>
  );
};

StyledTabList.tabsRole = 'TabList';

const tabListStyle: IBoxCSS = {
  margin: '0',
  padding: '0',
  userSelect: 'none',
};

export { StyledTabList as TabList };