import React from 'react'
import { useQuery } from 'react-query'
import { getAllMenuItem } from '../utils/api';

const useProperties = () => {
    const {data, isLoading, isError, refetch} = useQuery(
        "allMenuitem", getAllMenuItem, {refetchOnWindowFocus: false}

    );
    return{
        data, isError, isLoading, refetch
    }
}

export default useProperties