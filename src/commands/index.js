import React from 'react';
import {
    AutocompleteInput,
    BooleanField,
    BooleanInput,
    Datagrid,
    DateField,
    DateInput,
    Edit,
    EditButton,
    Filter,
    List,
    NullableBooleanInput,
    NumberField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
} from 'admin-on-rest/lib/mui';
import Icon from 'material-ui/svg-icons/editor/attach-money';

import Basket from './Basket';
import NbItemsField from './NbItemsField';
import CustomerReferenceField from '../visitors/CustomerReferenceField';

export const CommandIcon = Icon;

const CommandFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Customer" source="customer_id" reference="customers">
            <AutocompleteInput optionText={choice => `${choice.first_name} ${choice.last_name}`} />
        </ReferenceInput>
        <DateInput label="Passed Since" source="date_gte" />
        <DateInput label="Passed Before" source="date_lte" />
        <TextInput label="Min Amount" source="total_gte" />
        <NullableBooleanInput source="returned" />
    </Filter>
);

export const CommandList = (props) => (
    <List {...props} filters={<CommandFilter />} sort={{ field: 'date', order: 'DESC' }} perPage={25} title="Orders">
        <Datagrid >
            <DateField source="date" showTime />
            <TextField source="reference" />
            <CustomerReferenceField />
            <NbItemsField />
            <NumberField source="total" options={{ style: 'currency', currency: 'USD' }} />
            <TextField source="status" />
            <BooleanField source="returned" />
            <EditButton />
        </Datagrid>
    </List>
);

const CommandTitle = ({ record }) => <span>Order #{record.reference}</span>;
export const CommandEdit = (props) => (
    <Edit title={<CommandTitle />} {...props}>
        <SimpleForm>
            <Basket />
            <DateInput source="date" />
            <ReferenceInput label="Customer" source="customer_id" reference="customers">
                <AutocompleteInput optionText={choice => `${choice.first_name} ${choice.last_name}`} />
            </ReferenceInput>
            <SelectInput source="status" choices={[
                { id: 'delivered', name: 'delivered' },
                { id: 'ordered', name: 'ordered' },
                { id: 'cancelled', name: 'cancelled' },
            ]}/>
            <BooleanInput source="returned" />
            <div style={{ clear: 'both' }} />
        </SimpleForm>
    </Edit>
);
