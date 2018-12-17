import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Container, Row, Col, FormGroup, Form, Input } from 'reactstrap';
import CsvInput from './CsvInput';

//@ts-ignore
import * as csv2geojson from 'csv2geojson';

class App extends Component<{initialLatitude: number, initialLongitude: number, initialZoom: number}, { lat: number, lng: number, zoom: number, csvText: string, geoJsonText: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      lat: this.props.initialLatitude,
      lng: this.props.initialLongitude,
      zoom: this.props.initialZoom,
      csvText: '',
      geoJsonText: ''
    };
  }

  handleClick(text: string) {
    this.setState({
      csvText: text
    });

    // todo - do not assume "lat" "lng" but instead look for the proper column name.
    csv2geojson.csv2geojson(text, {
      latfield: 'lat',
      lonfield: 'lng',
      delimiter: ','
    }, (err: any, data: any) => {
      this.setState({
        geoJsonText: JSON.stringify(data, null, 2)
      })
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
              <Container>
                <Row>
                  <Col>
                    <Form>
                      <FormGroup>
                        <Input type="textarea" placeholder="Result" rows="10" value={this.state.geoJsonText} />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Container>
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
