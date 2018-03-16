import React, {Component} from 'react';
import ReactTable from 'react-table';
import _ from "lodash";
require('react-table/react-table.css');


const requestData = (pageSize, page, sorted, filtered, itemName) => {

    console.log( 'requestData called' )
    console.log( itemName )

    return new Promise((resolve, reject) => {


        fetch('http://localhost:8080/items',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
                start: page,
                pageSize : pageSize,
                sortedColumn : sorted[0].id,
                desc: sorted[0].desc,
                itemType: itemName,
                clientObject: null
            })
        }).then(response => response.json()).then(function (result) {

            let filteredData = result.productList;

            if (filtered.length) {
                filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
                    return filteredSoFar.filter(row => {
                        return (row[nextFilter.id] + "").includes(nextFilter.value);
                    });
                }, filteredData);
            }

            const sortedData = _.orderBy(
                filteredData,
                sorted.map(sort => {
                    return row => {
                        if (row[sort.id] === null || row[sort.id] === undefined) {
                            return -Infinity;
                        }
                        return typeof row[sort.id] === "string"
                            ? row[sort.id].toLowerCase()
                            : row[sort.id];
                    };
                }),
                sorted.map(d => (d.desc ? "desc" : "asc"))
            );

            const res = {
                rows: sortedData.slice(),
                pages: Math.ceil(result.size / pageSize)
            };

            resolve(res)
        }).catch( err => {
            console.log('error caught')
            reject()
        } )




    })





};

class DataList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: null,
            loading: true,
            itemName: props.itemName
        };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(state, instance) {

        this.setState({ loading: true, itemName : this.state.itemName });

        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered,
            this.state.itemName
        ).then(res => {
            this.setState({
                data: res.rows,
                pages: res.pages,
                loading: false
            });
        }).catch(
            error => {
                console.log('errror')
            }
        );
    }

    render() {

        const { data, pages, loading } = this.state;



        const columns = [{
            Header: 'Ürün',
            accessor: 'name', // String-based value accessors!
            Cell: props => <span>{props.value}</span>
        },
            {Header: 'Minimum Sipariş (kg)', accessor: 'minAmount'}, {Header: 'Kg Fiyat', accessor: 'price'},{Header: 'Şehir', accessor: 'city'}];

        return <ReactTable data={data} columns={columns}  minRows={0} showPageSizeOptions={false}  defaultPageSize={10}
                           manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                           pages={pages} // Display the total number of pages
                           loading={loading} // Display the loading overlay when we need it
                           onFetchData={this.fetchData} // Request new data when things change
                           defaultSorted={[
                               {
                                   id: 'date',
                                   desc: true
                               }
                           ]}
                           className="-striped -highlight"/>
    }
}

export default DataList;