import L from 'leaflet';
import { MapLayer, withLeaflet } from 'react-leaflet';

// Recreates react-leaflet's FeatureGroup with the ability to pass in custom FeatureGroup
// via https://github.com/PaulLeCam/react-leaflet/blob/master/src/FeatureGroup.js

class FeatureGroup extends MapLayer {
  createLeafletElement (props) {
    let el = this.props.featureGroup;

    if (!this.props.featureGroup) {
      el = new L.FeatureGroup(this.getOptions(props));
    }

    this.contextValue = {
      ...props.leaflet,
      layerContainer: el,
      popupContainer: el
    };

    return el;
  }
}

export default withLeaflet(FeatureGroup);
