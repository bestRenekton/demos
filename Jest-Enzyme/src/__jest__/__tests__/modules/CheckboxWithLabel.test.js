import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckboxWithLabel from '../../../component/CheckboxWithLabel/CheckboxWithLabel';


configure({ adapter: new Adapter() });


describe('Enzyme的浅渲染测试套件', () => {
    const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

    test('CheckboxWithLabel changes the text after click', () => {
        expect(checkbox.text()).toEqual('Off');
        checkbox.find('input').simulate('change');
        expect(checkbox.text()).toEqual('On');
    });
});