import _ from 'lodash';

import { IProvince } from '@/models/expressweb/zone';

const caStatesOrigin = {
    AB: {
        name: 'Alberta',
        abbreviation: 'AB'
    },
    BC: {
        name: 'British Columbia',
        abbreviation: 'BC'
    },
    MB: {
        name: 'Manitoba',
        abbreviation: 'MB'
    },
    NB: {
        name: 'New Brunswick',
        abbreviation: 'NB'
    },
    NL: {
        name: 'Newfoundland and Labrador',
        abbreviation: 'NL'
    },
    NS: {
        name: 'Nova Scotia',
        abbreviation: 'NS'
    },
    ON: {
        name: 'Ontario',
        abbreviation: 'ON'
    },
    PE: {
        name: 'Prince Edward Island',
        abbreviation: 'PE'
    },
    QC: {
        name: 'Quebec',
        abbreviation: 'QC'
    },
    SK: {
        name: 'Saskatchewan',
        abbreviation: 'SK'
    },
    NT: {
        name: 'Northwest Territories',
        abbreviation: 'NT'
    },
    NU: {
        name: 'Nunavut',
        abbreviation: 'NU'
    },
    YT: {
        name: 'Yukon',
        abbreviation: 'YT'
    }
};

const usStatesOrigin = {
    AL: {
        name: 'Alabama',
        abbreviation: 'AL'
    },
    AK: {
        name: 'Alaska',
        abbreviation: 'AK'
    },
    AZ: {
        name: 'Arizona',
        abbreviation: 'AZ'
    },
    AR: {
        name: 'Arkansas',
        abbreviation: 'AR'
    },
    AA: {
        name: 'Armed Forces America',
        abbreviation: 'AA'
    },
    AE: {
        name: 'Armed Forces Europe',
        abbreviation: 'AE'
    },
    AP: {
        name: 'Armed Forces Pacific',
        abbreviation: 'AP'
    },
    CA: {
        name: 'California',
        abbreviation: 'CA'
    },
    CO: {
        name: 'Colorado',
        abbreviation: 'CO'
    },
    CT: {
        name: 'Connecticut',
        abbreviation: 'CT'
    },
    DE: {
        name: 'Delaware',
        abbreviation: 'DE'
    },
    DC: {
        name: 'District of Columbia',
        abbreviation: 'DC'
    },
    FL: {
        name: 'Florida',
        abbreviation: 'FL'
    },
    GA: {
        name: 'Georgia',
        abbreviation: 'GA'
    },
    HI: {
        name: 'Hawaii',
        abbreviation: 'HI'
    },
    ID: {
        name: 'Idaho',
        abbreviation: 'ID'
    },
    IL: {
        name: 'Illinois',
        abbreviation: 'IL'
    },
    IN: {
        name: 'Indiana',
        abbreviation: 'IN'
    },
    IA: {
        name: 'Iowa',
        abbreviation: 'IA'
    },
    KS: {
        name: 'Kansas',
        abbreviation: 'KS'
    },
    KY: {
        name: 'Kentucky',
        abbreviation: 'KY'
    },
    LA: {
        name: 'Louisiana',
        abbreviation: 'LA'
    },
    ME: {
        name: 'Maine',
        abbreviation: 'ME'
    },
    MD: {
        name: 'Maryland',
        abbreviation: 'MD'
    },
    MA: {
        name: 'Massachusetts',
        abbreviation: 'MA'
    },
    MI: {
        name: 'Michigan',
        abbreviation: 'MI'
    },
    MN: {
        name: 'Minnesota',
        abbreviation: 'MN'
    },
    MS: {
        name: 'Mississippi',
        abbreviation: 'MS'
    },
    MO: {
        name: 'Missouri',
        abbreviation: 'MO'
    },
    MT: {
        name: 'Montana',
        abbreviation: 'MT'
    },
    NE: {
        name: 'Nebraska',
        abbreviation: 'NE'
    },
    NV: {
        name: 'Nevada',
        abbreviation: 'NV'
    },
    NH: {
        name: 'New Hampshire',
        abbreviation: 'NH'
    },
    NJ: {
        name: 'New Jersey',
        abbreviation: 'NJ'
    },
    NM: {
        name: 'New Mexico',
        abbreviation: 'NM'
    },
    NY: {
        name: 'New York',
        abbreviation: 'NY'
    },
    NC: {
        name: 'North Carolina',
        abbreviation: 'NC'
    },
    ND: {
        name: 'North Dakota',
        abbreviation: 'ND'
    },
    OH: {
        name: 'Ohio',
        abbreviation: 'OH'
    },
    OK: {
        name: 'Oklahoma',
        abbreviation: 'OK'
    },
    OR: {
        name: 'Oregon',
        abbreviation: 'OR'
    },
    PA: {
        name: 'Pennsylvania',
        abbreviation: 'PA'
    },
    RI: {
        name: 'Rhode Island',
        abbreviation: 'RI'
    },
    SC: {
        name: 'South Carolina',
        abbreviation: 'SC'
    },
    SD: {
        name: 'South Dakota',
        abbreviation: 'SD'
    },
    TN: {
        name: 'Tennessee',
        abbreviation: 'TN'
    },
    TX: {
        name: 'Texas',
        abbreviation: 'TX'
    },
    UT: {
        name: 'Utah',
        abbreviation: 'UT'
    },
    VT: {
        name: 'Vermont',
        abbreviation: 'VT'
    },
    VA: {
        name: 'Virginia',
        abbreviation: 'VA'
    },
    WA: {
        name: 'Washington',
        abbreviation: 'WA'
    },
    WV: {
        name: 'West Virginia',
        abbreviation: 'WV'
    },
    WI: {
        name: 'Wisconsin',
        abbreviation: 'WI'
    },
    WY: {
        name: 'Wyoming',
        abbreviation: 'WY'
    }
};

function mapProvince(obj: any): IProvince {
    return {
        code: obj.abbreviation,
        name: obj.name
    };
}

export const provinces = {
    get CA(): IProvince[] {
        return _.map(caStatesOrigin, mapProvince);
    },
    get US(): IProvince[] {
        return _.map(usStatesOrigin, mapProvince);
    }
};
