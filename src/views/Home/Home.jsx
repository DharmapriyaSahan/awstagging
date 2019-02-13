import React from "react";
import { Card, CardImg, CardText, CardHeader, CardBody, CardTitle, CardSubtitle, Row, Col, Button, CardFooter, Table } from "reactstrap";
import { MDBCol, MDBIcon } from "mdbreact";
import { PanelHeader, CardCategory } from "components";
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../../assets/css/template.css';
import { MDBFormInline, MDBInput } from "mdbreact";

var instancePool = [];


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      instanceid: null,
      instanceip: null,
      name: null,
      team: null,
      role: null
    }

    this.get = this.get.bind(this);
    this.createTable = this.createTable.bind(this);
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    // this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.get();
  }

  // test() {
  //   console.log('as')
  //   console.log(instancePool)
  //   // console.log(filteredIns);
  // }

  search(e) {

    var val;
    var filteredIns = [];
    
    val = e.target.value;
    
    for (var i = 0; i < instancePool.length; i++) {
    
      console.log("this" + this.state.t_role)
      if(instancePool[i].t_Team == this.state.team  && instancePool[i].t_role == this.state.role ){
        filteredIns.push(instancePool[i])
        continue;
      }else if (e.target.name == 'instanceid' && val == instancePool[i].InstanceID) { 
        filteredIns.push(instancePool[i])
      }else if (e.target.name == 'instanceip' && val == instancePool[i].instance_ip) {
        filteredIns.push(instancePool[i])
      }else if (e.target.name == 'name' && val == instancePool[i].t_name) {
        filteredIns.push(instancePool[i])
       }else if (e.target.name == 'team' && val == instancePool[i].t_Team && (this.state.role == null || this.state.role == '')) {
        filteredIns.push(instancePool[i])
      }else if (e.target.name == 'role' && val == instancePool[i].t_role && (this.state.team == null || this.state.team == '')) {
        filteredIns.push(instancePool[i])
      }
    }

    this.createTable(filteredIns);
  }

  get() {

    axios.get('getall').then((data) => {
      this.createTable(data.data);
      instancePool = data.data;
    }).catch((err) => {
      console.log(err)
    });

  }

  checkEnter(e) {

    console.log(e.key)
    if (e.key == 'Enter') {
      e.preventDefault();
      this.search(e);
    }

  }

  handleChange(e) {

    this.setState({
      [e.target.name]: e.target.value
    });

  }

  createTable(ins) {
    let tablebody = [];

    for (let i = 0; i < ins.length; i++) {
      tablebody.push(
        <tr>
          <th scope="row">{ins[i].InstanceID}</th>
          <td>{ins[i].instance_ip}</td>
          <td>{ins[i].t_name}</td>
          <td>{ins[i].t_Team}</td>
          <td>{ins[i].t_role}</td>
        </tr>
      );
    }
    console.log(tablebody)
    ReactDOM.render(tablebody, document.getElementById('bd'));
  }
  render() {
    return (
      <div>
        <PanelHeader
          size="sm" />
        <div className="content">
          <Row >

            <Col>
              <Card >
                <CardHeader>
                </CardHeader>
                <CardBody>

                  <hr />
                  <Table>
                    <thead>
                      <tr>
                        <th><MDBCol>
                          <form className="form-inline mt-4 mb-4" >
                            <MDBIcon icon="search" onClick={this.search} />
                            <input onKeyPress={this.checkEnter} name="instanceid" onChange={this.handleChange} value={this.state.instanceid} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                          </form>
                        </MDBCol>
                        </th>
                        <th><MDBCol>
                          <form className="form-inline mt-4 mb-4" >
                            <MDBIcon icon="search" onClick={this.search} />
                            <input onKeyPress={this.checkEnter} name="instanceip" onChange={this.handleChange} value={this.state.instanceip} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                          </form>
                        </MDBCol>
                        </th>
                        <th><MDBCol>
                          <form className="form-inline mt-4 mb-4" >
                            <MDBIcon icon="search" onClick={this.search} />
                            <input onKeyPress={this.checkEnter} name="name" onChange={this.handleChange} value={this.state.name} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                          </form>
                        </MDBCol>
                        </th>
                        <th><MDBCol>
                          <form className="form-inline mt-4 mb-4" >
                            <MDBIcon icon="search" onClick={this.search} />
                            <input onKeyPress={this.checkEnter} name="team" onChange={this.handleChange} value={this.state.team} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                          </form>
                        </MDBCol>
                        </th>
                        <th><MDBCol>
                          <form className="form-inline mt-4 mb-4" >
                            <MDBIcon icon="search" onClick={this.search} />
                            <input onKeyPress={this.checkEnter} name="role" onChange={this.handleChange} value={this.state.role} className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
                          </form>
                        </MDBCol>
                        </th>
                      </tr>
                    </thead>
                  </Table>
                  <hr />
                  <div style={{ overflow: "auto", height: "500px" }}>
                    <Table>
                      <thead>
                        <tr>
                          <th>Instance ID</th>
                          <th>Instance IP</th>
                          <th>Name</th>
                          <th>Team</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody id="bd"></tbody>


                    </Table>
                  </div>


                </CardBody>
                <Button onClick={this.test}></Button>
                <CardFooter>
                </CardFooter>

              </Card>

            </Col>

          </Row>
        </div>

      </div >

    );
  }
}

export default Home;
