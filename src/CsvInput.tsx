import React, { Component, ChangeEvent } from 'react';
import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import './CsvInput.css';

class CsvInput extends Component<{onClick: Function}, {value: string}> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: ''
    }
  }

  handleClick(): void {
    this.props.onClick(this.state.value);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({value: event.target.value});
  }
  
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Input type="textarea" name="inputCsv" placeholder="Copy CSV here." rows="10" value={this.state.value} onChange={(e: ChangeEvent<HTMLInputElement>) => {this.handleChange(e);}} />
              </FormGroup>
              <FormGroup className="float-right">
                <Button color="primary" onClick={() => {this.handleClick();}}>Convert</Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default CsvInput;
