'use strict';

function handleTableClick(event) {
    let target = event.target,
        classList = target.classList,
        dataset = target.dataset;

    if(classList.contains('prop__name')) {
        event.currentTarget.dataset.sortBy = dataset.propName;
        switch (dataset.dir) {
            case '1':
                dataset.dir = '-1';
                break;
            case '-1':
                dataset.dir = '1';
                break;
            default:
                dataset.dir = '1';
        }

        sortTable(dataset.propName, dataset.dir);
    }
}
