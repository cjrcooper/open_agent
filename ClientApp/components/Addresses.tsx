import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';

interface AddressesExampleState {
    addresses: AddressData[];
    loading: boolean;
    address: AddressData;
    searchTable: AddressData[];
}

export class Address extends React.Component<RouteComponentProps<{}>, AddressesExampleState> {
    constructor() {
        super();
        this.state = { loading: true, addresses: [], address: new AddressData(), searchTable: []};
        this.handleIndex();
        this.handleAddAddress = this.handleAddAddress.bind(this);
        this.handleDeleteAddress = this.handleDeleteAddress.bind(this);
        this.handleEditAddress = this.handleEditAddress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchTable = this.handleSearchTable.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderAddressesTable(this.state.searchTable);

        return <div>
            { contents }
        </div>;
    }
    
    private handleIndex() {
        fetch('api/Address/Index')
            .then(response => response.json() as Promise<AddressData[]>)
            .then(data => {
                this.setState({ addresses: data, loading: false, searchTable: data});
            });
    }

    private handleDeleteAddress(id: string) {
        if (!confirm("Do you want to delete this item?"))
            return;
        else {
            fetch('api/Address/Delete/' + id, {
                method: 'post'
            }).then(data => {
                this.setState(
                    {
                        addresses: this.state.addresses.filter((rec) => { return (rec.id != id) }),
                        searchTable: this.state.addresses.filter((rec) => { return (rec.id != id) })
                    });
            });
        }
    }
    
    private handleEditAddress(id: string) {
        this.props.history.push("/address/edit?addressId=" + id);
    }

    private handleAddAddress(event: any) {
        event.preventDefault();
        const data = new FormData(event.target);
            fetch("api/Address/Add",  {
                method: 'post',
                body: data,
            }).then((response) => response.json())
                .then(response => {
                    this.setState({
                        addresses: [...this.state.addresses, response],
                        searchTable: [...this.state.addresses, response]
                    });
                })
    }

    private handleChange(event: any) {
        let currentAddress: any = this.state.address;
        currentAddress[event.target.name] = event.target.value;
        this.setState({address: currentAddress});
    }
    
    private handleSearchTable(searchTerm: any) {
        let currentAddressState = this.state.addresses;
        let results: any = [];
        for(let i=0; i < currentAddressState.length; i++) {
            let addressItems = Object.values(currentAddressState[i]);
            for(let j = 0; j < addressItems.length; j++){
                 if(typeof(addressItems[j]) === "number"){
                    let numberString = addressItems[j].toString();
                    if(numberString.toLowerCase().includes(searchTerm.target.value)){
                        results.push(currentAddressState[i]);
                        break;
                    }
                } else if(typeof(addressItems[j]) === "string"){
                    if(addressItems[j].toLowerCase().includes(searchTerm.target.value)){
                        results.push(currentAddressState[i]);
                        break;
                    }
                 }
                
            }
            
        }
        
        if(results.length > 0) {
            this.setState({searchTable: results});
        }
        
        if(searchTerm.target.value === ""){
            this.setState({searchTable: currentAddressState})
        }
    }
    
    private static concatAddressUnitNumber(address: AddressData) {
        if (address.unit === null){
            return address.streetAddress;
        } else {
            return [address.unit, address.streetAddress].join("/");
        }
    }
    
    
    private renderAddressesTable(addresses: AddressData[]) {
        return <div className="jumbotron">
            <div className="card-body">
            <h2>Addresses</h2>
            <div className="form-group">
                <form onSubmit={this.handleAddAddress}>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputAddress">Address</label>
                            <input className="form-control" id="inputAddress" name={"streetAddress"} type="text"
                                   onChange={this.handleChange} placeholder="1234 Main St" required/>
                        </div>
                        <div className="form-group col-md-12">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input className="form-control" id="inputAddress2" name={"unit"} type="text"
                                   onChange={this.handleChange} placeholder="Apartment, suite, etc. (optional)"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCity">Suburb</label>
                            <input className="form-control" id="inputCity" name={"suburb"} type="text"
                                   onChange={this.handleChange} placeholder="Suburb" required/>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">State</label>
                            <select id="inputState" className="form-control" list="state" name={"state"} type="dropdown"
                                    onChange={this.handleChange} required>
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
                                   onChange={this.handleChange} placeholder="Postcode" required/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                        <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
            <div className="card-body">
                <div className="panel-body">
                    <input type="text" className="form-control" id="search" onChange={this.handleSearchTable} placeholder="Search..."/>
                </div>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>Address</th>
                        <th>Suburb</th>
                        <th>Postcode</th>
                        <th>State</th>
                    </tr>
                    </thead>
                    <tbody>
                    {addresses.map(address =>
                            <tr key={ address.id }>
                            <td>{ Address.concatAddressUnitNumber(address)}</td>
                            <td>{ address.suburb }</td>
                            <td>{ address.postcode }</td>
                            <td>{ address.state }</td>
                            <td>
                                <a className="action" onClick={(id) => this.handleEditAddress(address.id)}>Edit</a>  |
                                <a className="action" onClick={(id) => this.handleDeleteAddress(address.id)}>Delete</a>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
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