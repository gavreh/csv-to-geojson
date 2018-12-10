import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

class App extends Component<{initialLatitude: number, initialLongitude: number, initialZoom: number}, { lat: number, lng: number, zoom: number }> {
  constructor(props: any) {
    super(props);
    this.state = {
      lat: this.props.initialLatitude,
      lng: this.props.initialLongitude,
      zoom: this.props.initialZoom
    };
  }
  render() {
    const position: LatLngExpression = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
      </Map>
    )
  }
}

export default App;
