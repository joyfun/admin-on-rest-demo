import hdclient from './hdclient';
import React from 'react';
import {
    BooleanField,
    ChipField,
    SelectInput,
    Datagrid,
    DateField,
    DateInput,
    Delete,
    Edit,
    Filter,
    FormTab,
    List,
    LongTextInput,
    NullableBooleanInput,
    NumberField,
    ReferenceManyField,
    TabbedForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
import EditButton from '../buttons/EditButton';

export const ConfList = (props) => (
    <List {...props} sort={{ field: 'last_seen', order: 'DESC' }} perPage={10}>
        <Datagrid>
            <TextField  source="confNo" label="命令" />
            <TextField  source="isRecord" label="录制" />
            <TextField  source="isAdmin" label="管理" />
            <TextField  source="online" label="在线会员" />
            <TextField  source="invisable" label="隐身会员" />
            <TextField  source="duration" label="持续时长" />

            <EditButton />
        </Datagrid>
    </List>
);
