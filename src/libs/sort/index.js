Array.prototype.customeSort = function (match) {
    return QuickSort(this, match);
};

function QuickSort(A, match) {
    if (A.length === 0) return [];
    const a = [];
    const b = [];
    const p = A[0];

    for (var i = 1; i < A.length; i++) {
        if (match(A[i], p)) a[a.length] = A[i];
        else b[b.length] = A[i];
    }
    return QuickSort(a, match).concat(p, QuickSort(b, match));
}

export const dropdownOptions = [{
        text: "По умолчанию",
        value: 'defaultSort'
    },
    {
        text: "В алфавитном порядке по возростанию с начала",
        value: 'ascendingFromBeginningSort'
    },
    {
        text: "В алфавитном порядке по убыванию с начала",
        value: 'descendingFromBeginningSort'
    },
    {
        text: "В алфавитном порядке по возростанию с конца",
        value: 'asceningFromEndingSort'
    },
    {
        text: "В алфавитном порядке по убыванию с конца",
        value: 'descendingFromEndingSort'
    }
];

export const sorting = {
    "defaultSort": defaultSort,
    "ascendingFromBeginningSort": ascendingFromBeginningSort,
    "descendingFromBeginningSort": descendingFromBeginningSort,
    "asceningFromEndingSort": asceningFromEndingSort,
    "descendingFromEndingSort": descendingFromEndingSort
}

export function defaultSort(words) {

    return words
}

export function ascendingFromBeginningSort(words) {

    return words.customeSort((a, b) => {
        return a.localeCompare(b);
    })
}

export function descendingFromBeginningSort(words) {

    return words.customeSort((a, b) => {
        return b.localeCompare(a);
    })
}

export function asceningFromEndingSort(words) {

    return words.customeSort((a, b) => {
        const rev_a = a
            .split("")
            .reverse()
            .join("");

        const rev_b = b
            .split("")
            .reverse()
            .join("");

        return rev_a.localeCompare(rev_b);
    })
}

export function descendingFromEndingSort(words) {

    return words.customeSort((a, b) => {
        const rev_a = a
            .split("")
            .reverse()
            .join("");

        const rev_b = b
            .split("")
            .reverse()
            .join("");

        return rev_b.localeCompare(rev_a);
    })
}