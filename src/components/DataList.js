import React, {Component} from 'react';
import ReactTable from 'react-table';
require('react-table/react-table.css');


class DataList extends Component {
    render() {
        const data = [{
            name: 'Domates',
            min: 5,
            price: 7.5,
            city: 'Çanakkale'
        },
            {
                name: 'Portakal',
                min: 5,
                price: 5,
                city: 'Antalya'
            },
            {
                name: 'Portakal',
                min: 10,
                price: 6,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            },
            {
                name: 'Muz',
                min: 8,
                price: 3,
                city: 'Mersin'
            }];

        const columns = [{
            Header: 'Ürün',
            accessor: 'name', // String-based value accessors!
            Cell: props => <span>{props.value}</span>
        },
            {Header: 'Minimum Sipariş (kg)', accessor: 'min'}, {Header: 'Kg Fiyat', accessor: 'price'},{Header: 'Şehir', accessor: 'city'}];

        return <ReactTable data={data} columns={columns}  minRows={0} showPageSizeOptions={false} showPageJump={false} defaultPageSize={10}/>
    }
}

export default DataList;