// @flow
import * as React from "react";
import styled, { keyframes } from "react-emotion";

type Props = {
    // By default, 50ms need to pass in order for loader to be shown.
    wait: number
};

type State = {
    show: boolean
};

const Overlay = styled("div")({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    minHeight: "100%",
    width: "100%"
});

const IconWrapper = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 101,
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    "*": {
        display: "block",
        fontSize: 10,
        textTransform: "uppercase"
    }
});

const skip = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(359deg);
    }
`;

const Icon = styled("div")({
    position: "relative",
    transformOrigin: "50% 50%",
    display: "inline-block",
    width: 30,
    height: 30,
    border: "5px solid #ddd",
    borderRadius: "100%",
    background: "transparent",
    animation: skip + " 3s linear infinite",
    ":after": {
        content: '""',
        position: "absolute",
        top: -5,
        left: -5,
        right: -5,
        bottom: -5,
        borderRadius: "100%",
        border: "5px solid transparent",
        borderLeftColor: "#fa5a28"
    }
});

class Loader extends React.Component<Props, State> {
    timeout: ?TimeoutID;
    static defaultProps = {
        wait: 50
    };
    constructor() {
        super();
        this.timeout = null;
        this.state = {
            show: false
        };
    }

    componentDidMount() {
        if (this.props.wait) {
            this.timeout = setTimeout(() => {
                this.setState({ show: true });
            }, this.props.wait);
            return;
        }
        this.setState({ show: true });
    }

    componentWillUnmount() {
        this.props.wait && this.timeout && clearTimeout(this.timeout);
    }

    render() {
        if (this.state.show) {
            return (
                <Overlay>
                    <IconWrapper>
                        <Icon />
                    </IconWrapper>
                </Overlay>
            );
        }

        return null;
    }
}

export default Loader;
