import React from "react";
import './content.css';
import {Row} from "antd";
import NoInternetConnectionError from "../errors/no-internet-connection-error";
import Error from "../errors/error";
import Spinner from "../spinner/spinner";
import CardsAll from "../cards-all/cards-all";
import InputSearch from '../input/input';
import Pagination_ from "../pagination/pagination";




const Content = ({dataFromApp, inputChange, paginationChange}) => {
    const {inputValue, data, loading, error, errorDetails, internetConnection, minValue, maxValue} = dataFromApp;
    const noInternetConnectionError = !internetConnection ? <NoInternetConnectionError /> : null;
    const errorMessage = error ? <Error errorDetails={errorDetails} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const input = !(loading || error) ? <InputSearch inputChange={inputChange} inputValue={inputValue} /> : null;
    const content = !(loading || error) ? <CardsAll data={data} minValue={minValue} maxValue={maxValue} /> : null;
    const pagination = !(loading || error) && (data.length > 6) ? <Pagination_ dataFromApp={dataFromApp} paginationChange={paginationChange} /> : null;

    return (
        <div className="main">
            <Row gutter={[16, 16]} justify="center">
                {spinner}
                {noInternetConnectionError}
                {errorMessage}
                {input}
                {content}
                {pagination}
            </Row>
        </div>
    );
};

export default Content;