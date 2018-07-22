// @flow
import * as React from "react";
import Icon from "webiny-client-ui-material/Icon";

import refreshIcon from "./baseline-autorenew-24px.svg";
import penIcon from "./baseline-edit-24px.svg";
import deleteIcon from "./baseline-delete-24px.svg";
import sortIcon from "./baseline-sort-24px.svg";
import beforeIcon from "./baseline-navigate_before-24px.svg";
import nextIcon from "./baseline-navigate_next-24px.svg";
import tuneIcon from "./baseline-tune-24px.svg";

export const RefreshIcon = (props: Object = {}) => {
    return <Icon src={refreshIcon} {...props} />;
};

export const DeleteIcon = (props: Object = {}) => {
    return <Icon src={deleteIcon} {...props} />;
};

export const EditIcon = (props: Object = {}) => {
    return <Icon src={penIcon} {...props} />;
};

export const SortIcon = (props: Object = {}) => {
    return <Icon src={sortIcon} {...props} />;
};

export const PreviousPageIcon = (props: Object = {}) => {
    return <Icon src={beforeIcon} {...props} />;
};

export const NextPageIcon = (props: Object = {}) => {
    return <Icon src={nextIcon} {...props} />;
};

export const OptionsIcon = (props: Object = {}) => {
    return <Icon src={tuneIcon} {...props} />;
};
