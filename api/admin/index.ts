export interface ITableDataFromServer {
    result: any[];
    total: number;
}

export class TableDataFromServer implements ITableDataFromServer {

    result: any[] = []
    total = 0

    setData(serverData: ITableDataFromServer) {
        Object.assign(this, serverData)
    }
}