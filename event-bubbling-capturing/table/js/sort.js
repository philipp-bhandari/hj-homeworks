'use strict';

function handleTableClick(event) {
    let target = event.target,
        classList = target.classList,
        dataset = target.dataset;

    if(classList.contains('prop__name')) {
        event.currentTarget.dataset.sortBy = dataset.propName;
        dataset.dir = dataset.dir === '1' ? '-1' : '1';
        sortTable(dataset.propName, dataset.dir);
    }
}
