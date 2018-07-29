// @flow
import * as React from "react";
import { Icon } from "webiny-client-ui-material/Icon";
import { Ripple } from "webiny-client-ui-material/Ripple";

import refreshIcon from "./baseline-autorenew-24px.svg";
import penIcon from "./baseline-edit-24px.svg";
import deleteIcon from "./baseline-delete-24px.svg";
import sortIcon from "./baseline-sort-24px.svg";
import beforeIcon from "./baseline-navigate_before-24px.svg";
import nextIcon from "./baseline-navigate_next-24px.svg";
import tuneIcon from "./baseline-tune-24px.svg";

export const RefreshIcon = (props: Object = {}) => {
    return (
        <Ripple unbounded>
            <Icon src={refreshIcon} {...props} />
        </Ripple>
    );
};

export const DeleteIcon = (props: Object = {}) => {
    return (
        <Ripple unbounded>
            <Icon src={deleteIcon} {...props} />
        </Ripple>
    );
};

export const CreateIcon = (props: Object = {}) => {
    return (
        <Ripple unbounded>
            <Icon src={penIcon} {...props} />
        </Ripple>
    );
};

export const EditIcon = (props: Object = {}) => {
    return (
        <Ripple unbounded>
            <Icon src={penIcon} {...props} />
        </Ripple>
    );
};

export const SortIcon = (props: Object = {}) => {
    return (
        <Ripple unbounded>
            <Icon src={sortIcon} {...props} />
        </Ripple>
    );
};

export const PreviousPageIcon = (props: Object = {}) => {
    return (
        <Ripple unbounded>
            <Icon src={beforeIcon} {...props} />
        </Ripple>
    );
};

export const NextPageIcon = (props: Object = {}) => {
    return (
        <Ripple unbounded>
            <Icon src={nextIcon} {...props} />
        </Ripple>
    );
};

export const OptionsIcon = (props: Object = {}) => {
    return (
        <Ripple unbounded>
            <Icon src={tuneIcon} {...props} />
        </Ripple>
    );
};
