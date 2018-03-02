import React, {Component} from 'react'
import ReactTable from 'react-table'


class DataList extends Component {
    render() {
        const data = [{
            name: 'dddffsd',
            min : 5 ,
            price: 7.5
        }];

        const columns = [{
            Header: 'Ürün',
            accessor: 'name', // String-based value accessors!
            Cell: props => <span >{props.value}</span>
        },
            { Header: 'Minimum Sipariş', accessor: 'min' },{Header: 'Kg Fiyat', accessor: 'price'}];

        return <ReactTable  data={data} columns={columns}/>
    }
}

export default DataList;