export function hasChildren(item) {
    const { items: children } = item;

    if (children === undefined) {
        return false;
    }

    if (children.constructor !== Array) {
        return false;
    }

    if (children.length === 0) {
        return false;
    }

    return true;
}

export function hasAccess(item, userrole) {
    //console.log(item,userrole);

    if (!item.accesses) {
        return true;
    }
    if (item.accesses && item.accesses.length <= 0) {
        return true;
    }
    return item.accesses.includes(userrole)
};

export function hasNonAccess(item, userrole) {
    if (!item.nonaccesses) return false;
    if (item.nonaccesses && item.nonaccesses.length <= 0) return false;
    if (item.nonaccesses.includes(userrole)) {
        return true;
    }
};
