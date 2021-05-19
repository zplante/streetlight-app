import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { withNavigation } from 'react-navigation';
import MapView, { Marker, ProviderPropType } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import flagPinkImg from '../assets/car.png';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      pinPlaced: false,
    };

    
  }

  componentDidMount() {
    this.watchId = Geolocation.watchPosition(
      (position) => {this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          regionFound: true,
      });
    },
    {enableHighAccuracy: false, timeout: 1, maximumAge: 1, distanceFilter: 1}
    );
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `hi`,
        },
      ],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          region={this.state.region}
          onPress={this.onMapPress}
          showsUserLocation={true}
        >
          {this.state.markers.map(marker => (
            <Marker
              title={marker.key}
              image={flagPinkImg}
              key={marker.key}
              coordinate={marker.coordinate}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap to create a marker of random color</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;