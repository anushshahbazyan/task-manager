const createTaskId = (listLength: number) => {
    return listLength < 10 ? 'T00' + (listLength + 1) : 'T0' + (listLength + 1);
};

export default createTaskId;
