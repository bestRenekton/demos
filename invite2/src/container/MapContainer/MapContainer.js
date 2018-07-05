import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap';
import Close from '../../component/Close/Close'

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {

    }
    render() {
        return (
            [
                <Close history={this.props.history} key={0} />,
                <Map center={{ lng: 116.402544, lat: 39.928216 }}
                    zoom="12"
                    style={{ width: '100%', height: '100%' }}
                    key={1}
                >
                    <Marker position={{ lng: 116.402544, lat: 39.928216 }} />
                    <NavigationControl />
                    <InfoWindow position={{ lng: 116.402544, lat: 39.928216 }} text="内容" title="标题" />
                </Map>
            ]

        )
    }
}

export default withRouter(MapContainer);