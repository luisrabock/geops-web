import React from 'react';
import App from '../pages/App';
import { shallow } from 'enzyme';

const setup = () => {
    return shallow(<App />);
};

describe('app tests', () => {
    it('renders without error', () => {
        const wrapper = setup();

        expect(wrapper.length).toBe(1);
    });
});
