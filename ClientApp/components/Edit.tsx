import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import 'isomorphic-fetch';

interface AddressesExampleState {
    loading: boolean;
    address: AddressData;
    updateAddress: {};
}

export class Edit extends React.Component<RouteComponentProps<any>, AddressesExampleState> {
    constructor(props:any) {
        super(props);
        this.handleIndex();
        this.state = { loading: true, address: new AddressData(), updateAddress: {}};
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdateAddress = this.handleUpdateAddress.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderAddressesTable(this.state.address);

        return <div>
            { contents }
        </div>;
    }

    private handleIndex() {
        let url = new URLSearchParams(this.props.location.search);
        let id = url.get("addressId");
        fetch('api/Address/Find/' + id)
            .then(response => response.json() as Promise<AddressData>)
            .then(data => {
                this.setState({ address: data, loading: false});
            });
    }

    private handleUpdateAddress(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch("api/Address/Edit",  {
            method: 'post',
            body: data,
        }).then(() => {
            this.props.history.push("/"); 
        });
    }
    

    private handleChange(event: any) {
        console.log(this.state.address);
        let currentAddress: any = this.state.address;
        currentAddress[event.target.name] = event.target.value;
        this.setState({address: currentAddress});
    }


    private renderAddressesTable(address: AddressData) {
        return <div className="jumbotron">
            <div className="card-body">
                <h2>Addresses</h2>
                <div className="form-group">
                    <form onSubmit={this.handleUpdateAddress}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <input id="id" name={"id"} type="hidden" required value={address.id}/>
                                <label htmlFor="inputAddress">Address</label>
                                <input className="form-control" id="inputAddress" name={"streetAddress"} type="text"
                                       onChange={this.handleChange} placeholder="1234 Main St" required value={address.streetAddress}/>
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="inputAddress2">Address 2</label>
                                <input className="form-control" id="inputAddress2" name={"unit"} type="text"
                                       onChange={this.handleChange} placeholder="Apartment, suite, etc. (optional)" value={address.unit ? address.unit : ""}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">Suburb</label>
                                <input className="form-control" id="inputCity" name={"suburb"} type="text"
                                       onChange={this.handleChange} placeholder="Suburb" required value={address.suburb}/>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control" list="state" name={"state"} type="dropdown"
                                        onChange={this.handleChange} required value={address.state}>
                                    <option defaultValue={"State..."} disabled hidden>State...</option>
                                    <option value="Australian Capital Territory">Australian Capital Territory</option>
                                    <option value="New South Wales">New South Wales</option>
                                    <option value="Northern Territory">Northern Territory</option>
                                    <option value="Queensland">Queensland</option>
                                    <option value="South Australia">South Australia</option>
                                    <option value="Tasmania">Tasmania</option>
                                    <option value="Victoria">Victoria</option>
                                    <option value="Western Australia">Western Australia</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Postcode</label>
                                <input id="inputZip" className="form-control" name={"postCode"} type="number"
                                       onChange={this.handleChange} placeholder="Postcode" required value={address.postcode}/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-2">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    }
}

export class AddressData {
    id: string = "";
    streetAddress: string = "";
    suburb: string = "";
    postcode: number = 0;
    state: string = "";
    unit: string = "";
    dateTime: Date;
}