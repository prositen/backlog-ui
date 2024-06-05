function sortString(a, b, field, sort_order = 1) {
    return a[field].localeCompare(b[field], 'se') * sort_order;
}

function sortInt(a, b, field, sort_order = 1) {
    return (a[field] - b[field]) * sort_order;
}

function sortNothing(a, b, field, sort_order) {
    return 0;
}

function sortDate(a, b, field, sort_order) {
    const da = Date.parse(a[field]);
    const db = Date.parse(b[field]);
    let cmp = 0;
    if (da < db) {
        cmp = -1;
    } else if (da > db) {
        cmp = 1
    }
    return cmp * sort_order;
}

export {sortString, sortInt, sortNothing, sortDate};
export default sortString;
