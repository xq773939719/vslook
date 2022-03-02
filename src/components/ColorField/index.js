import { useState } from 'react';
import { useDebounce } from 'react-use';
import Picker from './Picker';
import Swatch from './Swatch';
import { postMessage } from '../../utils';

import { colord } from 'colord';

const ColorInput = ({ name, label }) => {
  const [color, setColor] = useState(window.$theme[name]);

  useDebounce(
    () => {
      const Colord = colord(color);
      if (!Colord.isEqual(window.$theme[name])) {
        postMessage({ type: 'SET_COLOR', payload: { name, value: color } });
      }
    },
    200,
    [color],
  );

  return (
    <fieldset>
      <label className='mb-1 block text-xs font-medium text-gray-400'>{label}</label>
      <div className='flex h-6 items-center divide-x divide-gray-200 overflow-hidden rounded-md ring-1 ring-gray-200'>
        <Picker value={color} onChange={setColor} />
        <Swatch value={color} onChange={setColor} />
      </div>
    </fieldset>
  );
};

export default ColorInput;
