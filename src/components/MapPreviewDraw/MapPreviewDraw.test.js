import React from 'react';
import { shallow } from 'enzyme';

import MapPreviewDraw from '.';

describe('MapDraw', () => {
  describe('Render', () => {
    const testClass = 'test';
    const testText = 'Hi';

    const mapdraw = shallow(
      <MapPreviewDraw>
        <div className={testClass}>{testText}</div>
      </MapPreviewDraw>
    );
    const mapdrawDive = mapdraw.dive();
    const editcontrol = mapdrawDive.find('ForwardRef(Leaflet(EditControl))');

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
    const mapdraw = shallow(<MapPreviewDraw onCreated={handleOnCreated} />);
    const mapdrawDive = mapdraw.dive();
    const editcontrol = mapdrawDive.find('ForwardRef(Leaflet(EditControl))');

    let testCreated = 1;

    function handleOnCreated () {
      testCreated++;
    }

    editcontrol.prop('onCreated')();

    it('should fire given onCreated event', () => {
      expect(testCreated).toEqual(2);
    });
  });
});
