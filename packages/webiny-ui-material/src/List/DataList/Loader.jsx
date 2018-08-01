// @flow
import * as React from "react";
import styled from "react-emotion";
import Skeleton from "react-loading-skeleton";

const LoaderUl = styled("ul")({
    listStyle: "none",
    margin: "0 0 10px 0 !important",
    padding: "0 !important",
    "li > div": {
        display: "inline-block",
        verticalAlign: "middle"
    },
    ".graphic": {
        fontSize: 36,
        width: 36
    },
    ".data": {
        width: "calc(-36px + 75%)",
        marginLeft: 10
    },
    ".actions": {
        width: "calc(-36px + 25%)",
        marginLeft: 10,
        textAlign: "right",
        "> div": {
            display: "inline-block",
            fontSize: 24,
            marginLeft: 10,
            width: 24
        }
    }
});

const Loader = () => {
    return (
        <LoaderUl>
            {[1, 2, 3, 4, 5].map(item => (
                <li key={"list-" + item}>
                    <div className="graphic">
                        <Skeleton />
                    </div>
                    <div className="data">
                        <Skeleton count={2} />
                    </div>
                    <div className="actions">
                        <div>
                            <Skeleton />
                        </div>
                        <div>
                            <Skeleton />
                        </div>
                    </div>
                </li>
            ))}
        </LoaderUl>
    );
};

export default Loader;
