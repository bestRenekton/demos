import React, { Component } from 'react';
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmap';


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
            <Map center={{ lng: 116.402544, lat: 39.928216 }} zoom="12" style={{width:'100%',height:'100%'}}>
                <Marker position={{ lng: 116.402544, lat: 39.928216 }} />
                <NavigationControl />
                <InfoWindow position={{ lng: 116.402544, lat: 39.928216 }} text="内容" title="标题" />
            </Map>
        )
    }
}

export default MapContainer;