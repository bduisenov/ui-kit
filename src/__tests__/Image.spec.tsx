import { shallow } from 'enzyme';
import 'jest-enzyme';
import * as React from 'react';

import { Box } from '../Box';
import { Image } from '../Image';

let useContextSpy: jest.SpyInstance;
describe('Image component', () => {
  beforeAll(async () => {
    useContextSpy = jest.spyOn(React, 'useContext').mockReturnValue({});
  });

  afterAll(() => {
    useContextSpy.mockRestore();
  });

  it('renders Box as img', () => {
    const wrapper = shallow(<Image />).shallow();
    expect(wrapper).toMatchElement(<Box as="img" />);
  });

  it('passes all props but hidden and responsive', () => {
    const props = {
      alt: 'example',
      src: 'example.com',
      hidden: false,
      responsive: true,
    };

    const wrapper = shallow(<Image {...props} />);
    expect(wrapper).toHaveProp({
      alt: props.alt,
      src: props.src,
    });

    expect(wrapper).not.toHaveProp('hidden');
    expect(wrapper).not.toHaveProp('responsive');
  });

  it('always renders img', () => {
    const wrapper = shallow(<Image as="h3" />);
    expect(wrapper).toHaveProp('as', 'img');
  });

  describe('styles', () => {
    it('hides image when hidden is true', () => {
      const wrapper = shallow(<Image hidden css={{ opacity: 0.5 }} />);
      expect(wrapper).toHaveProp('css', expect.arrayContaining([{ display: 'none' }, { opacity: 0.5 }]));
    });

    it('sets responsive dimension when responsive is true', () => {
      const wrapper = shallow(<Image responsive />);
      expect(wrapper).toHaveProp(
        'css',
        expect.arrayContaining([
          {
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '100%',
          },
          undefined,
        ])
      );
    });
  });
});