import React from 'react';
import { shallow } from 'enzyme';

import MapDraw from 'components/MapDraw';

describe('MapDraw', () => {
  describe('Render', () => {
    const testClass = 'test';
    const testText = 'Hi';

    const mapdraw = shallow(
      <MapDraw>
        <div className={testClass}>{testText}</div>
      </MapDraw>
    );
    const editcontrol = mapdraw.find('ForwardRef(Leaflet(EditControl))');

    it('should render with the position prop', () => {
      expect(editcontrol.prop('position')).toEqual('bottomright');
    });

    it('should render with the disabled shape features', () => {
      expect(editcontrol.prop('draw').circle).toEqual(false);
      expect(editcontrol.prop('draw').circlemarker).toEqual(false);
      expect(editcontrol.prop('draw').polyline).toEqual(false);
    });

    it('should render children within the component', () => {
      expect(mapdraw.find(`.${testClass}`).text()).toEqual(testText);
    });
  });

  describe('Events', () => {
    const mapdraw = shallow(
      <MapDraw onCreated={handleOnCreated} onEdited={handleOnEdited} />
    );
    const editcontrol = mapdraw.find('ForwardRef(Leaflet(EditControl))');

    let testCreated = 1;
    let testEdited = 1;

    function handleOnCreated () {
      testCreated++;
    }

    function handleOnEdited () {
      testEdited++;
    }

    editcontrol.prop('onCreated')();
    editcontrol.prop('onEdited')();

    it('should fire given onCreated event', () => {
      expect(testCreated).toEqual(2);
    });

    it('should fire given onEdited event', () => {
      expect(testEdited).toEqual(2);
    });
  });
});
