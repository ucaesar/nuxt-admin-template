export interface ResourceGroup {
    id: number;
    groupname: string;
    description: string;
}

export interface ResourceGroupList {
    result: ResourceGroup[];
    total: number;
}