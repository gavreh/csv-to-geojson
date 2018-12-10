import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Container, Row, Col } from 'reactstrap';
import CsvInput from './CsvInput';

class App extends Component<{initialLatitude: number, initialLongitude: number, initialZoom: number}, { lat: number, lng: number, zoom: number, csvText: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      lat: this.props.initialLatitude,
      lng: this.props.initialLongitude,
      zoom: this.props.initialZoom,
      csvText: ''
    };
  }

  handleClick(text: string) {
    console.log('todo - handleClick', text);
    this.setState({
      csvText: text
    });
  }

  render() {
    const position: LatLngExpression = [this.state.lat, this.state.lng]
    return (
      <div>
        <header>
          <h1>CSV to GeoJSON</h1>
          <div className="instructions">
            <p>
              Copy in a CSV. First line is the header, and must have a <span title="'lat', 'Lat', 'LAT', 'latitude', 'Latitude', 'LATITUDE'">latitude</span> and <span title="'lng', 'Lng', 'LNG', 'lon', 'Lon', 'LON', 'long', 'Long', 'LONG', 'longitude', 'Longitude', 'LONGITUDE'">longitude</span>.
            </p>
          </div>
        </header>
        <Container fluid>
          <Row>
            <Col>
              <CsvInput onClick={(text: string) => this.handleClick(text)}></CsvInput>
            </Col>
            <Col>
              <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                  attribution='Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
                />
              </Map>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App;
