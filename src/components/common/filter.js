function filter_field(field_name, item, value) {
    if (value === 'all') {
        return true;
    } else {
        if (value === 'null') {
            value = null;
        }
        return item[field_name] === value;

    }
}

function filter_field_list(field_name, item, value) {
    if (value === 'all') {
        return true;
    } else if ([null, 'null'].includes(value)) {
        return item[field_name].length === 0;
    } else {
        return item[field_name].map(a => a.id).includes(value);
    }

}

export {filter_field_list, filter_field};
export default filter_field_list;
