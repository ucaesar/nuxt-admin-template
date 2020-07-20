export interface IPackageItem {
    weight: string | undefined;
    length: string | undefined;
    width: string | undefined;
    height: string | undefined;
}

export class PackageItem implements IPackageItem {
    weight: string | undefined = undefined;
    length: string | undefined = undefined;
    width: string | undefined = undefined;
    height: string | undefined = undefined;
}

export interface IPackage {
    weightUnit: string;
    dimensionUnit: string;
    packageType: string | undefined;
    weight: string | undefined;
    packages: IPackageItem[] | undefined;
}

export class Package implements IPackage {
    weightUnit: string = 'kg';
    dimensionUnit: string = 'cm';
    packageType: string | undefined = undefined;
    weight: string | undefined = undefined;
    packages: IPackageItem[] | undefined = undefined;
}
